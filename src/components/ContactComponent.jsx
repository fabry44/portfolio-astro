import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm.jsx";
import data from "../data/data.json";

export const ContactComponent = () => {
    const { user } = data; // Récupérer `user` depuis `data.json`

    return (
        <motion.section
            initial={{ opacity: 0.3, x: 0, y: 0, scale: 1 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1.15 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.42, 0, 0.58, 1], // Animation plus fluide
            }}
            viewport={{ once: false, amount: 0.2 }} // Animation au scroll, réutilisable
            className="flex justify-center items-center bg-section relative overflow-hidden"
        >
            <motion.div
                className="flex flex-wrap -mx-3 mb-6 contactsection absolute z-10"
                initial={{ opacity: 0, x: 95, y: 60, rotate: 341 , scale: 0.1 }}
                whileInView={{ opacity: 1, x:0, y: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <ContactForm />
                </div>

                <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0 flex justify-center items-center">
                    <div className="bg-light-secondary text-lg space-y-3 m-auto text-light-text dark:text-dark-text flex flex-col items-start">
                        <h2 className="text-2xl font-bold">Me contacter</h2>
                        <p><strong>Téléphone :</strong> {user.phone}</p>
                        <p><strong>Email :</strong> 
                            <a href={`mailto:${user.email}`} className="text-light-primary dark:text-dark-primary hover:underline">
                                {user.email}
                            </a>
                        </p>
                        <p><strong>Adresse :</strong> {user.address}</p>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default ContactComponent;
