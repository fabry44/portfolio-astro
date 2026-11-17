export const prerender = true;

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects({ projects }) {

    return (
        <div className="project-grid">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={false}
                >
                    <ProjectCard 
                        name={project.title}
                        highlights={project.highlights}
                        technology={project.technology}
                        img={project.Allimg}
                        description={project.description}
                        github={project.github}
                        link={project.link}

                    />
                </motion.div>
            ))}
        </div>
    );
}
