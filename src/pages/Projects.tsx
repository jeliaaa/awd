import { useEffect, useState } from "react";
import { useApiStore } from "../store/apiStore";
import { Link } from "react-router-dom";

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
            <ul className="flex gap-4 text-primary plain-text">
                {years.reverse().map((year) => (
                    <li key={year}>
                        <button className={`cursor-pointer border-primary border py-2 px-4 rounded-3xl hover:underline ${year === yearTab ? 'bg-primary text-white' : ''} hover:-translate-y-1 transition-all delay-100`} onClick={() => setYearTab(year)}>
                            {year}
                        </button>
                    </li>
                ))}
            </ul>
            {loading ? <p>loading</p> :
                <div className="w-full flex flex-wrap justify-center gap-5 p-10 pb-10 box-border">
                    {projects.map((project) => (
                        <Link to={`${project.id}`} className="md:w-[30%] hover:-translate-y-2 group box-border w-full flex shadow-md flex-col rounded-lg">
                            <img src={project.image} alt={project.name} className="w-full rounded-t-lg h-1/2 object-cover object-center" />
                            <div className="flex plain-text h-1/2 items-start group-hover:bg-primary/5 transition-all delay-150 flex-col gap-2 p-4">
                                <div className="flex w-full justify-between">
                                    <span>{project.date}</span>
                                    <span className="text-primary">{project.location}</span>
                                </div>
                                <span className="title">{project.name} {project.duration}</span>
                                <span className="w-full text-wrap break-words text-start">{project.description}</span>
                            </div>
                        </Link>
                    ))}
                </div>}
        </div>
    );
}

export default Projects;