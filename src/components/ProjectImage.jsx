import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectImage = ({ img = [] }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextImage = (e) => {
        e.stopPropagation();
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % img.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex - 1 + img.length) % img.length);
    };

    return (
        <div className="relative flex flex-col items-center transition duration-500 ease-in-out transform overflow-hidden rounded-xl w-full h-full">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                    key={img[index]}
                    alt="Capture du Projet"
                    className="object-cover w-full h-full"
                    loading="lazy"
                    src={`/projects/${img[index].replace(/\.(jpg|jpeg|png|webp)$/, "-medium.avif")}`} // Par défaut, medium.avif
                    srcSet={`
                        /projects/${img[index].replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")} 320w,
                        /projects/${img[index].replace(/\.(jpg|jpeg|png|webp)$/, "-medium.avif")} 640w,
                        /projects/${img[index].replace(/\.(jpg|jpeg|png|webp)$/, "-large.avif")} 1024w
                    `}
                    sizes="(max-width: 600px) 320px, (max-width: 1200px) 640px, 1024px"
                    initial={{ x: direction * 250, opacity: 0, scale: 0.95 }}
                    animate={{ x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }}
                    exit={{ x: -direction * 250, opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }}
                />
            </AnimatePresence>

            {img.length > 1 && (
                <>
                    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" onClick={prevImage}>◀</button>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" onClick={nextImage}>▶</button>
                </>
            )}
        </div>
    );
};

export default ProjectImage;
