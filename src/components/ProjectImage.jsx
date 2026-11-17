export const prerender = true;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectImage = ({ img = [], name = 'Projet' }) => {
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

    if (img.length === 0) return null;
    return (
        <div className="relative flex flex-col items-center transition duration-500 ease-in-out transform overflow-hidden rounded-xl w-full h-full">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                    key={img[index]}
                    alt={`${name} — capture ${index + 1} sur ${img.length}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    src={`/projects/${img[index]}`}
                    initial={false}
                />
            </AnimatePresence>

            {img.length > 1 && (
                <>
                    <button type="button" aria-label={`Capture précédente — ${name}`} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" onClick={prevImage}>◀</button>
                    <button type="button" aria-label={`Capture suivante — ${name}`} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" onClick={nextImage}>▶</button>
                </>
            )}
        </div>
    );
};

export default ProjectImage;
