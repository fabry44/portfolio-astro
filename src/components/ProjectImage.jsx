import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectImage = ({ img = [] }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = droite, -1 = gauche

    const nextImage = () => {
        setDirection(1); // Défilement vers la droite
        setIndex((prevIndex) => (prevIndex + 1) % img.length);
    };

    const prevImage = () => {
        setDirection(-1); // Défilement vers la gauche
        setIndex((prevIndex) => (prevIndex - 1 + img.length) % img.length);
    };

    return (
        <div className="relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-hidden rounded-xl sm:rounded-xl lg:border lg:border-gray-800 group-hover:shadow-2xl w-full h-60">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                    key={img[index]}
                    alt="Capture du Projet"
                    className="object-cover object-top w-full h-full transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105"
                    loading="lazy"
                    src={`/projects/${img[index]}`}
                    initial={{
                        x: direction * 250,
                        opacity: 0,
                        scale: 0.95, // Ajout d'un effet de zoom entrant
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        scale: 1, // Retour progressif à 1
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }, // Bézier pour un rendu fluide
                    }}
                    exit={{
                        x: -direction * 250,
                        opacity: 0,
                        scale: 1.05, // Légère expansion en sortie
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                    }}
                />
            </AnimatePresence>

            {/* Boutons de navigation */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                onClick={nextImage}
            >
                ◀
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                onClick={prevImage}
            >
                ▶
            </button>
        </div>
    );
};

export default ProjectImage;
