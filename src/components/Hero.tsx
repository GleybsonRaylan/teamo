import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";

import heroImg from "../assets/hero-couple.png";

import { MusicPlayer } from "./MusicPlayer";

interface Props {
  musicAutoplay: boolean;
}

export function Hero({ musicAutoplay }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-background">
      {/* BACKGROUND */}
      <motion.div
        initial={{
          scale: 1.05,
          x: 0,
        }}
        animate={{
          scale: [1.05, 1, 1.05],
          x: [0, -8, 8, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Casal romântico"
          className="h-full w-full object-cover object-center"
          width={1024}
          height={1536}
          loading="eager"
          decoding="async"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-background/45" />

        {/* CINEMATIC GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/60 to-background" />

        {/* LOWER DARK AREA */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />

        {/* TEXT AREA */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-background via-background/90 to-transparent md:backdrop-blur-[3px]" />

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_8%,rgba(8,3,5,0.58)_52%,rgba(8,3,5,0.96)_100%)]" />
      </motion.div>

      {/* GLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.22, 0.38, 0.22],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-rose-glow/20 blur-2xl md:h-56 md:w-56 md:blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 pb-10 pt-32 text-center">
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.8,
          }}
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm md:backdrop-blur-md"
        >
          <Heart size={14} className="text-rose-glow" />

          <span className="text-[10px] uppercase tracking-[0.38em] text-white/80">
            Nossa História
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.75,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl font-display text-[3rem] leading-[0.92] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)] sm:text-6xl md:text-7xl md:drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        >
          Eu vejo meu futuro
          <br />
          <span className="text-[#ffd6de] drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            em seus olhos
          </span>
        </motion.h1>

        {/* LINE */}
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            delay: 1.05,
            duration: 0.8,
          }}
          className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-rose-glow/70 to-transparent"
        />

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.25,
            duration: 0.9,
          }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-base md:drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]"
        >
          Eu admiro a maneira como você existe. Porque até nos dias mais comuns, você consegue
          transformar pequenos momentos em memórias que eu queria viver para sempre.
        </motion.p>

        {/* PLAYER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 0.8,
          }}
          className="mx-auto mt-8 max-w-sm"
        >
          <MusicPlayer autoplay={musicAutoplay} />
        </motion.div>

        {/* SCROLL */}
        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 7, 0],
          }}
          transition={{
            opacity: {
              delay: 1.85,
              duration: 0.9,
            },
            y: {
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="mt-9 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:text-rose-glow"
        >
          Ver momentos <ArrowDown size={14} />
        </motion.a>
      </div>
    </section>
  );
}
