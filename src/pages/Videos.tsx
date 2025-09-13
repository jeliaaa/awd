import { useEffect } from "react";
import { useApiStore } from "../store/apiStore";

function Videos() {
    const { loading, videos, fetchVideos } = useApiStore();
    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])
    return (
        <div className="text-center w-full flex flex-col items-center gap-10">
            {loading ? <p>loading</p> :
                <div className="w-full flex flex-wrap justify-center gap-5 p-10 pb-10 box-border">
                    {videos.map((video) => (
                        <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${video.url.split('/')[3].split("=")[1]}/hqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <span className="text-white plain-text font-bold">
                                        ნახე ვიდეო
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="title font-semibold text-dark-color mb-1">
                                    {video.title}
                                </h2>
                                <div className="w-full break-words"
                                    dangerouslySetInnerHTML={
                                        { __html: video.description || '' }
                                    }
                                ></div>
                            </div>
                        </a>
                    ))}
                </div>}
        </div>
    );
}

export default Videos;