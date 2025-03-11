import React from 'react';
import { motion } from 'framer-motion';

const ProjectImage = ({ img }) => {
    const [currentImage, setCurrentImage] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % img.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [img.length]);

    return (
        <div className="relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl lg:border lg:border-gray-800 group-hover:shadow-2xl">
            <motion.img
                key={currentImage}
                alt="Captura del Proyecto"
                className="object-cover object-top w-full h-56 transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105"
                loading="lazy"
                src={img[currentImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        </div>
    );
};

export default ProjectImage;
