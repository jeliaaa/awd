import { useEffect, useState } from "react";
import { useApiStore } from "../store/apiStore";
import { useParams } from "react-router-dom";

const BlogSingle = () => {
  const { id } = useParams();
  const { blogSingle, fetchBlogSingle, loading } = useApiStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogSingle(parseInt(id));
    }
  }, [id, fetchBlogSingle]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Top section */}
      <div className="flex justify-between  flex-col md:flex-row items-center gap-5">
        <img
          src={blogSingle?.images[0].image}
          alt="banner"
          className="w-[50%] md:w-[30%] rounded-xl"
        />
        <div className="md:w-[68%] w-full text-center md:text-start">
          <h2 className="title font-semibold text-primary">
            {blogSingle?.title}
          </h2>
          <h6 className="text-gray-500 plain-text">
            {blogSingle?.created_at.slice(0, 10)}
          </h6>
        </div>
      </div>

      {/* Description */}
      <div
        className="w-full break-words"
        dangerouslySetInnerHTML={{
          __html: blogSingle?.description || "",
        }}
      ></div>

      {/* Horizontal Scroll Gallery */}
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4">
          {blogSingle?.images?.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedImage(img.image)}
            >
              <img
                src={img.image}
                alt={img.alt_text}
                className="h-[200px] w-auto rounded-xl border-2 border-background hover:scale-[1.03] transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] p-4 bg-white rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-700 text-white rounded-full px-3 py-1 hover:bg-gray-900"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="preview"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSingle;
