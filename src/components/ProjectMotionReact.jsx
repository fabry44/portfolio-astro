"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { CodeIcon } from "./IconsMotion";

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ProjectMotion({ projects }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={ref} className="flex flex-col gap-y-16">
            {projects.map(({ title, description, technology, link, github }, index) => {
                const y = useParallax(scrollYProgress, 200 * (index + 1));

                return (
                    <motion.article
                        key={title}
                        className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.8 }}
                        style={{ y }}
                    >
                        <div className="w-full md:w-1/2 flex items-center group">
                            <motion.div
                                className="relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl lg:border lg:border-gray-800 group-hover:shadow-2xl"
                                whileHover={{ scale: 1.85 }}
                            >
                                <img alt="Capture du Projet" className="object-cover object-top w-full h-56 transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105" loading="lazy" src="/developpeur.webp" />
                            </motion.div>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col justify-center group">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <CodeIcon />
                                {title}
                            </h3>
                            <div className="flex flex-wrap mt-2">
                                <ul className="flex flex-wrap mb-2 gap-x-2">
                                {technology.map(({ name, icon, class: className, style }) => {
                                    // Convertit la string CSS en objet JavaScript
                                    const styleObject = style
                                        .split(";") // Sépare chaque règle CSS
                                        .filter(rule => rule.includes(":")) // Ignore les éléments vides
                                        .reduce((acc, rule) => {
                                            let [key, value] = rule.split(":");
                                            if (key && value) {
                                                key = key.trim().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()); // Convertit en camelCase
                                                acc[key] = value.trim();
                                            }
                                            return acc;
                                        }, {});

                                    return (
                                        <li key={name}>
                                            <span className={`flex gap-x-2 rounded-full text-xs py-1 px-2 ${className}`} style={styleObject}>
                                                {icon}
                                            </span>
                                        </li>
                                    );
                                })}

                                </ul>
                            </div>

                            <div className="mt-2 text-lg mb-4">{description}</div>

                            <footer className="flex items-end justify-start mt-4 gap-x-4">
                                {github && (
                                    <a href={github} className="flex items-center gap-x-2">
                                        <span className="size-6">🔗</span> Code
                                    </a>
                                )}
                                {link && (
                                    <a href={link} className="flex items-center gap-x-2">
                                        <span className="size-4">🌐</span> Preview
                                    </a>
                                )}
                            </footer>
                        </div>
                    </motion.article>
                );
            })}
            <motion.div className="progress" style={{ transform: scaleX }} />
        </div>
    );
}
