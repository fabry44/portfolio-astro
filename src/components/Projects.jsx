export const prerender = true;
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard.jsx";

export default function Projects({ projects }) {
    const [openCard, setOpenCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false); // ✅ Pour savoir si les projets sont visibles
    const ref = useRef(null); // ✅ Référence pour observer le conteneur

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // ✅ Déclenche l’animation une seule fois
                    observer.disconnect(); // ✅ On arrête d'observer après activation
                }
            },
            { threshold: 0.2 } // ✅ Détecte quand 20% du conteneur est visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect(); // Nettoyage
    }, []);

    const toggleCard = (projectIndex) => {
        setOpenCard(prevOpenCard => (prevOpenCard === projectIndex ? null : projectIndex));
    };

    return (
        <div ref={ref} className="flex flex-wrap justify-center gap-16">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -950, scale: 0}} // ✅ Départ hors écran
                    animate={isVisible ? { opacity: 1, y: 0, scale: 1} : {}} // ✅ Animation quand visible
                    transition={{ duration: 0.8, delay: index * 0.35, ease: "easeOut" }} // ✅ Effet de cascade
                >
                    <ProjectCard 
                        name={project.title}
                        highlights={project.highlights}
                        technology={project.technology}
                        img={project.Allimg}
                        description={project.description}
                        github={project.github}
                        link={project.link}
                        isOpen={openCard === index}
                        toggleCard={() => toggleCard(index)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
