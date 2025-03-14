import { motion, AnimatePresence } from "framer-motion";
import ProjectImage from "./ProjectImage.jsx";

export default function ProjectCard({ name, highlights, technology, img, description, github, link, isOpen, toggleCard }) {
    return (
        <motion.div 
            className={`relative bg-gray-700 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer 
                w-full sm:w-[480px] md:w-[600px] lg:w-[520px]`} // ✅ Taille uniforme des cartes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleCard}
        >
            {/* Image du projet */}
            <div className="w-full h-[400px] overflow-hidden rounded-lg"> {/* ✅ Hauteur fixe pour éviter la déformation */}
                <ProjectImage img={img} />
            </div>

            {/* Nom du projet */}
            <h3 className="text-xl text-white font-bold mt-4 text-center">{name}</h3>

            {/* Technologies */}
            <div className="flex flex-wrap justify-center mt-3">
                <ul className="flex flex-wrap gap-2">
                    {technology.map(({ name, icon, class: className, style }, index) => {
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
                                    className={`flex items-center gap-x-2 rounded-full text-xs py-1 px-3 font-medium ${className}`} 
                                    style={inlineStyle}
                                >
                                    {icon} {name}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Icône d'ouverture */}
            <div className="absolute top-4 right-4 text-lg">
                {isOpen ? "🔼" : "🔽"}
            </div>

            {/* Description avec animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
            </AnimatePresence>

            {/* Liens GitHub et Preview */}
            <footer className="flex justify-center mt-5 gap-4">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 text-blue-500 hover:underline">
                        <span>🔗</span> Code
                    </a>
                )}
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 text-green-500 hover:underline">
                        <span>🌐</span> Preview
                    </a>
                )}
            </footer>
        </motion.div>
    );
}
