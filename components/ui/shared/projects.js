import Project from "./project"
import data from "../../../data/projects.json"

export default () => (
    <div className="projects">
        {
            data.projects.map(project => {
                return (<Project
                    key={`${project.org}-${project.name}`}
                    {...project}
                />);
            })
        }
        <style jsx>{`
            .projects {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                width: 100%;
                margin-top: 80px;
                margin-bottom: -80px;
                z-index: 1;
            }
        `}</style>
    </div>
)
