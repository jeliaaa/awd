import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useApiStore } from "../store/apiStore";
import Loader from "../components/Loader";

export default function Blog() {
  const {
    blog,
    fetchBlog,
    loading,
    fetchActivities,
    activities,
    fetchBlogCategories,
    blog_categories,
  } = useApiStore();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const categorySlug = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const itemsPerPage = 3;

  useEffect(() => {
    fetchBlog(categorySlug || undefined, search || undefined);
  }, [fetchBlog, categorySlug, search]);

  useEffect(() => {
    fetchActivities(3, 0);
    fetchBlogCategories();
  }, [fetchActivities, fetchBlogCategories]);

  const totalPages = Math.ceil(blog.length / itemsPerPage);

  const paginatedBlogs = useMemo(() => {
    return blog.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [blog, currentPage]);

  const updateQueryParams = (updates: Record<string, string | number | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  };

  const handleSearchChange = (value: string) => {
    updateQueryParams({
      search: value || null,
      page: 1,
    });
  };

  const handleCategoryChange = (slug: string) => {
    updateQueryParams({
      category: slug || null,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    updateQueryParams({ page });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex pt-15 flex-col lg:flex-row gap-6 p-4 pb-20 w-full mx-auto">
      <div className="flex-1">
        <h1 className="title font-bold mb-4">Latest News</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search blog..."
            className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 outline-none focus:border-primary"
          />
        </div>

        {paginatedBlogs.length === 0 ? (
          <div className="plain-text text-gray-500">No blog posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="cursor-pointer plain-text bg-white shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
                onClick={() => navigate(`/blog/${item.id}`)}
              >
                <img
                  src={import.meta.env.VITE_BACKEND_APP_URL + item.cover_image?.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500">{item.created_at.slice(0, 10)}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description || "" }}
                    className="w-full overflow-hidden pr-1"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded cursor-pointer text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800 border-0 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="lg:w-1/5 w-full border-primary border shadow-primary p-4">
        <h2 className="title font-bold mb-4">Categories</h2>

        <ul className="space-y-2 plain-text mb-6">
          <li>
            <button
              type="button"
              onClick={() => handleCategoryChange("")}
              className={`cursor-pointer text-left ${
                categorySlug === "" ? "text-primary font-bold" : "text-gray-700"
              }`}
            >
              All Categories
            </button>
          </li>

          {blog_categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => handleCategoryChange(category.slug)}
                className={`cursor-pointer text-left hover:underline ${
                  categorySlug === category.slug
                    ? "text-primary font-bold"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <h2 className="title font-bold mb-4">Future Activities</h2>
        <ul className="space-y-2 plain-text">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="text-primary hover:underline cursor-pointer"
            >
              <Link to={`${activity.blog_id}`}>
                {activity.blog_title}
                {">"}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}