import { motion } from 'framer-motion';

export const RollsPortrait = ({ img }) => (
  <motion.img
    initial={{ opacity: 0, x: 150, rotate: -180, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
    transition={{
        duration: 2,
        ease: [0.42, 0, 0.58, 1], // Utilisation d'une courbe d'animation personnalisée pour un effet plus naturel
        delay: 0.2, // Ajout d'un léger délai pour une entrée plus douce
        bounce: 0.8, // Ajout d'un effet de rebond pour plus de dynamisme
        type: "spring", // Utilisation d'un ressort pour un effet plus réaliste
    }}
    viewport={{ once: true, amount: 0.2 }}
    src={`/uploads/users/${img}`}
    alt="Fabien Roy"
    className="rounded-full size-64"
  />
);
export default RollsPortrait;