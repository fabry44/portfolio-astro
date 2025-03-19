
import { motion } from "framer-motion";
export const RollsPortrait = ({ img }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // ✅ Vérification côté client

  return (
    <>
      {/* Sur mobile, pas d'animation */}
      {isMobile ? (
        <img
          fetchpriority="high"
          width={320}
          height={320}
          src={`/${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")}`}
          srcSet={` 
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")} 320w,
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-medium.avif")} 640w,
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-large.avif")} 1024w
          `}
          sizes="(max-width: 600px) 320px, (max-width: 1200px) 640px, 1024px"
          loading="eager"
          alt="Fabien Roy"
          className="rounded-full size-64 object-cover"
        />
      ) : (
        // Sur desktop, animation avec Motion
        <motion.img
          initial={{ opacity: 0, x: 150, rotate: -180, scale: 0.5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.42, 0, 0.58, 1],
            delay: 0.1,
          }}
          fetchpriority="high"
          width={320}
          height={320}
          viewport={{ once: true, amount: 0.2 }}
          src={`/${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")}`}
          srcSet={` 
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-small.avif")} 320w,
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-medium.avif")} 640w,
            /${img.replace(/\.(jpg|jpeg|png|webp)$/, "-large.avif")} 1024w
          `}
          sizes="(max-width: 600px) 320px, (max-width: 1200px) 640px, 1024px"
          loading="eager"
          alt="Fabien Roy"
          className="rounded-full size-64 object-cover"
        />
      )}
    </>
  );
};

export default RollsPortrait;
