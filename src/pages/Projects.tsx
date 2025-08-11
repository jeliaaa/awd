function Projects() {
    const years = [2021, 2022, 2023, 2024, 2025];

    return (
        <div className="text-center flex flex-col gap-10">
            <ul className="flex gap-4 text-primary plain-text">
                {years.map((year) => (
                    <li key={year}>
                        <button className="cursor-pointer hover:underline">
                            {year}
                        </button>
                    </li>
                ))}
            </ul>
            Projects
        </div>
    );
}

export default Projects;