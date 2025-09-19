import { useEffect, useState } from "react";
import { useApiStore } from "../store/apiStore";
import Loader from "../components/Loader";

function Stories() {
    const { loading, stories, fetchStories } = useApiStore();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    const getYouTubeId = (url: string) => {
        try {
            return url.split('/')[3].split("=")[1];
        } catch {
            return null;
        }
    };

    return (
        <div className="text-center  w-full flex flex-col items-center gap-10">
            {loading ? <Loader /> :
                <div className="w-full flex flex-wrap justify-center gap-5 p-10 pb-10 box-border">
                    {stories.map((story) => {
                        const videoId = getYouTubeId(story.videos[0].url);
                        return (
                            <div
                                key={story.id}
                                onClick={() => setSelectedVideo(videoId)}
                                className="group cursor-pointer block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <span className="text-white plain-text font-bold">
                                            ნახე ვიდეო
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="title font-semibold text-dark-color mb-1">
                                        {story.title}
                                    </h2>
                                    <div
                                        className="w-full break-words"
                                        dangerouslySetInnerHTML={{
                                            __html: story.description || ""
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            }

            {/* Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-lg relative w-full max-w-4xl">
                        {/* Close Button */}
                        <button
                            className="absolute -top-3 -right-3 cursor-pointer bg-white w-10 aspect-square rounded-full  text-black hover:text-red-600 text-xl"
                            onClick={() => setSelectedVideo(null)}
                        >
                            ✕
                        </button>
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full rounded-2xl"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stories;
