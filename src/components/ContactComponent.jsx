import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm.jsx";
import data from "../data/data.json";

export const ContactComponent = () => {
    const { user } = data; // Récupération de `user` depuis `data.json`

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }} // Ajout d'un flou initial
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.42, 0, 0.58, 1], // Animation fluide
            }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex justify-center items-center bg-section relative overflow-hidden"
        >
            {/* <div class="absolute inset-0 bg-white/20 backdrop-blur-md"></div> */}
            <motion.div
                className="flex flex-wrap -mx-3 mb-6 contactsection absolute z-10"
                initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -5 }} // Ajout d'un effet de "pop-in"
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.4,
                    staggerChildren: 0.2, // Ajoute un effet décalé sur les éléments internes
                }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Formulaire de contact */}
                <motion.div 
                    className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0 p-4"
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    
                    
                        <ContactForm />
                    
                </motion.div>

                {/* Informations de contact */}
                <motion.div
                    className="w-full md:w-1/2 px-6 mb-6 md:mb-0 flex justify-center items-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="bg-light-secondary dark:text-dark-secondary  text-lg space-y-3 m-auto text-light-text dark:text-dark-text flex flex-col jus items-start">
                        <h1 className="text-2xl font-bold">Coordonnées</h1>
                        <p><strong>Téléphone :</strong> {user.phone}</p>
                        <p><strong>Email :</strong> 
                            <a href={`mailto:${user.email}`} className="text-dark-primary dark:text-dark-primary hover:underline">
                                {user.email}
                            </a>
                        </p>
                        <p><strong>Adresse :</strong> {user.address}</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default ContactComponent;
