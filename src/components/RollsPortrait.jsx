import { motion } from 'framer-motion';

export const RollsPortrait = ({ img }) => (
  <motion.img
    initial={{ opacity: 0, x: 150, rotate: -180, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
    transition={{
        duration: 1.2, // Réduit la durée pour accélérer l'affichage
        ease: [0.42, 0, 0.58, 1],
        delay: 0.1, // Réduction du délai
    }}
    fetchpriority="high" // Pour forcer le chargement rapide de l'image principale
    width={64}
    height={64}
    viewport={{ once: true, amount: 0.2 }}
    src={`/${img}`}
    loading="eager" // Met "eager" pour les images critiques
    alt="Fabien Roy"
    className="rounded-full size-64 object-cover"
/>

);
export default RollsPortrait;