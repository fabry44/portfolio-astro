import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectImage = ({ img = [] }) => {
    const [index, setIndex] = useState(0);

    // Défilement automatique toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % img.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [img.length]);

    return (
        <div className="relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-hidden rounded-xl sm:rounded-xl lg:border lg:border-gray-800 group-hover:shadow-2xl w-full h-56">
            <AnimatePresence mode="wait">
                <motion.img
                    key={img[index]}
                    alt="Capture du Projet"
                    className="object-cover object-top w-full h-full transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105"
                    loading="lazy"
                    src={`/projects/${img[index]}`} // Bonne source des images
                    initial={{ opacity: 0, x: 50 }} // Animation entrée
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }} // Animation sortie
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Boutons de navigation */}
            <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full" 
                onClick={() => setIndex((prevIndex) => (prevIndex - 1 + img.length) % img.length)}
            >
                ◀
            </button>
            <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full" 
                onClick={() => setIndex((prevIndex) => (prevIndex + 1) % img.length)}
            >
                ▶
            </button>
        </div>
    );
};

export default ProjectImage;
