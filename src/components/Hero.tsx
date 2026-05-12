import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import heroImg from "@/assets/hero-couple.png";

import { MusicPlayer } from "./MusicPlayer";

interface Props {
  musicAutoplay: boolean;
}

export function Hero({ musicAutoplay }: Props) {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-end pb-10 overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Romantic couple silhouette"
          className="w-full h-full object-cover"
          width={1024}
          height={1536}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, oklch(0.06 0.01 20 / 0.85) 80%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 px-6 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="uppercase tracking-[0.4em] text-xs text-rose-glow mb-4"
        >
          Nossa Historia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="font-display text-4xl sm:text-5xl text-blush text-glow leading-[1.1]"
        >
          Eu vejo meu futuro em seus olhos
          <br />
          <em className="text-rose-glow font-light">...</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-5 text-muted-foreground max-w-md mx-auto leading-relaxed"
        >
          Eu encontrei uma mulher, mais forte que qualquer pessoa que conheço
        </motion.p>

        <div className="mt-8">
          <MusicPlayer autoplay />
        </div>

        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 8, 0],
          }}
          transition={{
            opacity: {
              delay: 1.8,
              duration: 1,
            },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="mt-10 inline-flex items-center gap-2 text-sm text-blush/80 tracking-widest uppercase"
        >
          Our Story <ArrowDown size={14} />
        </motion.a>
      </div>
    </section>
  );
}
