import { useEffect, useState } from "react";
import { useApiStore } from "../store/apiStore";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Projects() {
    const [yearTab, setYearTab] = useState<number>(2025);
    const years = [2021, 2022, 2023, 2024, 2025];
    const { loading, projects, fetchProjects } = useApiStore();
    useEffect(() => {
        fetchProjects(2025);
    }, [fetchProjects])
    useEffect(() => {
        fetchProjects(yearTab);
    }, [yearTab, fetchProjects])
    return (
        <div className="text-center w-full flex flex-col items-center gap-10">
            <div className="flex gap-4 text-primary plain-text">
                {years.reverse().map((year) => (
                    <div key={year}>
                        <button className={`cursor-pointer border-primary border py-2 px-4 rounded-3xl hover:underline ${year === yearTab ? 'bg-primary text-white' : ''} hover:-translate-y-1 transition-all delay-100`} onClick={() => setYearTab(year)}>
                            {year}
                        </button>
                    </div>
                ))}
            </div>
            {loading ? <Loader /> :
                <div className="w-full flex flex-wrap justify-center gap-5 p-10 pb-10 box-border">
                    {projects.map((project) => (
                        <Link to={`${project.id}`} className="md:w-[30%] hover:-translate-y-2 group box-border w-full flex shadow-md flex-col rounded-lg">
                            {/* <img src={project.image || mainLogo } alt={project.name} className="w-full rounded-t-lg h-[200px] object-cover object-center" /> */}
                            <div className="flex plain-text h-fit items-start group-hover:bg-primary/5 transition-all delay-150 flex-col gap-2 p-4">
                                <div className="flex w-full justify-between">
                                    <span>{project.date}</span>
                                    <span className="text-primary">{project.location}</span>
                                </div>
                                <span className="title">{project.name}</span>
                                <span className="w-full text-wrap break-words text-start">{project.description}</span>
                            </div>
                        </Link>
                    ))}
                </div>}
        </div>
    );
}

export default Projects;