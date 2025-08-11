import { motion } from "framer-motion";

export function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: ["0%", `${Math.random() * 100}%`],
            y: ["0%", `${Math.random() * 100}%`],
            rotate: [0, Math.random() * 360],
            transition: {
              duration: Math.random() * 50 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          }}
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
          }}
        />
      ))}
    </div>
  );
}
