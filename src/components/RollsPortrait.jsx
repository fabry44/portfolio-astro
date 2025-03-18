export const prerender = true;
import { motion } from "framer-motion";
export const RollsPortrait = ({ img }) => (
  <motion.img
    initial={{ opacity: 0, x: 150, rotate: -180, scale: 0.5 }}
    whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
    transition={{
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1],
        delay: 0.1,
    }}
    fetchpriority="high" // ⚡️ Charge en priorité
    width={320} // 🔥 Taille réduite pour mobile
    height={320} 
    viewport={{ once: true, amount: 0.2 }}
    
    // ⬇️ Utilisation de la plus petite image par défaut (small.avif pour mobile)
    src={`/${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")}`}
    srcSet={` 
        /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")} 320w,
        /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-medium.avif")} 640w,
        /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-large.avif")} 1024w
    `}
    
    // 🔥 Définit les tailles adaptées pour forcer le chargement du plus petit fichier
    sizes="(max-width: 600px) 320px, (max-width: 1200px) 640px, 1024px"

    // ✅ Suppression du lazy loading pour éviter le délai LCP
    loading="eager" 

    alt="Fabien Roy"
    className="rounded-full size-64 object-cover"
/>
);

export default RollsPortrait;
