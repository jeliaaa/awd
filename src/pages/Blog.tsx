import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type BlogItem = {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
};

const blogData: BlogItem[] = [
    {
        id: 1,
        title: "First Blog Post",
        date: "2025-06-17",
        description: "Short summary of the first blog post.",
        image: "https://picsum.photos/400/300?random=1",
    },
    {
        id: 2,
        title: "Second Blog Post",
        date: "2025-06-15",
        description: "Short summary of the second blog post.",
        image: "https://picsum.photos/400/300?random=2",
    },
    {
        id: 3,
        title: "Second Blog Post",
        date: "2025-06-15",
        description: "Short summary of the second blog post.",
        image: "https://picsum.photos/400/300?random=5",
    },
    {
        id: 4,
        title: "Second Blog Post",
        date: "2025-06-15",
        description: "Short summary of the second blog post.",
        image: "https://picsum.photos/400/300?random=2",
    },
    {
        id: 5,
        title: "Second Blog Post",
        date: "2025-06-15",
        description: "Short summary of the second blog post.",
        image: "https://picsum.photos/400/300?random=2",
    },
    {
        id: 6,
        title: "Second Blog Post",
        date: "2025-06-15",
        description: "Short summary of the second blog post.",
        image: "https://picsum.photos/400/300?random=2",
    }
    // Add more mock blog data...
];

const futureActivities = [
    { id: 1, name: "Hackathon 2025", link: "/activity/1" },
    { id: 2, name: "React Meetup", link: "/activity/2" },
    { id: 3, name: "AI Conference", link: "/activity/3" },
];

export default function Blog() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    const paginatedBlogs = blogData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(blogData.length / itemsPerPage);

    return (
        <div className="flex pt-15 flex-col lg:flex-row gap-6 p-4 pb-20 w-full mx-auto">
            {/* Main Section */}
            <div className="flex-1">
                <h1 className="title font-bold mb-4">Latest News</h1>
                <div className="grid grid-cols-3 gap-6">
                    {paginatedBlogs.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="cursor-pointer plain-text bg-white shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
                            onClick={() => navigate(`/blog/${item.id}`)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="font-semibold">{item.title}</h2>
                                <p className="text-gray-500">{item.date}</p>
                                <p className="mt-2 text-gray-700">{item.description}</p>
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
                    {futureActivities.map((activity) => (
                        <li
                            key={activity.id}
                            className="text-primary hover:underline cursor-pointer"
                            onClick={() => navigate(activity.link)}
                        >
                            {activity.name}
                            {">"}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
