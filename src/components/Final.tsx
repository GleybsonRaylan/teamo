import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { Starfield } from "./Starfield";
import { Particles } from "./Particles";

export function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-romance px-6 pt-28 pb-20">
      <Starfield density={100} />
      <Particles count={14} />

      <div className="relative z-10 w-full max-w-lg text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="uppercase tracking-[0.4em] text-xs text-rose-glow mb-6"
        >
          Forever
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display text-4xl sm:text-5xl text-blush text-glow leading-tight"
        >
          Eu Escolheria Você.
          <br />
          <em className="text-rose-glow">Em Todas As Vidas</em>
          <span className="text-rose-glow"> ❤</span>
        </motion.h2>

        <motion.button
          onClick={onReplay}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.6,
            duration: 1,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 px-8 py-3.5 rounded-full glass text-blush text-sm tracking-[0.25em] uppercase shadow-glow border border-rose-glow/30"
        >
          Reviva a nossa história.
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.65 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.9,
            duration: 1,
          }}
          className="mt-12 text-muted-foreground text-xs tracking-widest uppercase"
        >
          Feito com amor
        </motion.p>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.1,
            duration: 0.9,
          }}
          className="mt-10 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-rose-glow/40" />

            <Heart
              size={12}
              className="fill-rose-glow/80 text-rose-glow/80 drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]"
            />

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose-glow/40" />
          </div>

          <p className="text-[11px] tracking-[0.18em] text-white/40">Desenvolvido por</p>

          <a
            href="https://gleybsonferreiradev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-1 font-display text-[22px] text-[#ffd9e0] transition-all duration-500 hover:scale-[1.03]"
          >
            <span className="absolute inset-0 blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-70">
              Gleybson Ferreira
            </span>

            <span className="relative bg-gradient-to-r from-[#fff1f4] via-[#ffd6de] to-[#ffc2cf] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(251,113,133,0.45)]">
              Gleybson Ferreira
            </span>
          </a>
        </motion.footer>
      </div>
    </section>
  );
}
