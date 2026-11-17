export const prerender = true;
import { motion } from "framer-motion";
import ProjectImage from "./ProjectImage.jsx";
import { Code2, ExternalLink } from "lucide-react";

export default function ProjectCard({ name, technology, img, description, github, link }) {
    return (
        <motion.div 
            className="ProjectCard project-card"
            initial={false}
        >
            {/* Image du projet */}
            <div className="project-image">
                <ProjectImage img={img} name={name} />
            </div>

            {/* Nom du projet */}
            <h3 className="project-title font-bold">{name}</h3>

            {/* Technologies */}
            <div>
                <ul className="project-tags">
                    {technology.map(({ name, class: className, style }, index) => {
                        // Convertir le style en objet
                        const inlineStyle = typeof style === "string"
                            ? Object.fromEntries(
                                style.split(";").map(s => {
                                    const [key, value] = s.split(":").map(str => str.trim());
                                    return key && value ? [key, value] : null;
                                }).filter(Boolean)
                            )
                            : style;

                        return (
                            <li key={index} className="flex items-center">
                                <span 
                                    className={`project-tag font-medium ${className}`}
                                    style={inlineStyle}
                                >
                                    {name}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <details className="project-description">
                <summary>Présentation du projet</summary>
                <div
                    dangerouslySetInnerHTML={{ __html: description }} />
            </details>

            {/* Liens GitHub et Preview */}
            <footer className="project-actions">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`Code de ${name} (nouvel onglet)`}>
                        <Code2 aria-hidden="true" /> Code
                    </a>
                )}
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Voir ${name} (nouvel onglet)`}>
                        <ExternalLink aria-hidden="true" /> Voir le projet
                    </a>
                )}
            </footer>
        </motion.div>
    );
}
