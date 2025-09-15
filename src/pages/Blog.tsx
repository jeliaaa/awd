import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApiStore } from "../store/apiStore";
import Loader from "../components/Loader";

export default function Blog() {
    const { blog, fetchBlog, loading, fetchActivities, activities } = useApiStore();

    useEffect(() => {
        fetchBlog();
        fetchActivities(3, 0);
    }, [fetchBlog, fetchActivities])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    const paginatedBlogs = blog.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(blog.length / itemsPerPage);


    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex pt-15 flex-col lg:flex-row gap-6 p-4 pb-20 w-full mx-auto">
            {/* Main Section */}
            <div className="flex-1">
                <h1 className="title font-bold mb-4">Latest News</h1>
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
                                <div dangerouslySetInnerHTML={{ __html: item.description || "" }} className="w-full overflow-hidden pr-1"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded cursor-pointer text-sm font-medium ${currentPage === i + 1
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-800 border-0 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/5 w-full border-primary border shadow-primary p-4">
                <h2 className="title font-bold mb-4">Future Activities</h2>
                <ul className="space-y-2 plain-text ">
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
        </div >
    );
}
