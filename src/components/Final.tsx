import { motion } from "framer-motion";
import { Starfield } from "./Starfield";
import { Particles } from "./Particles";

export function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-romance">
      <Starfield density={100} />
      <Particles count={14} />
      <div className="relative text-center px-6 max-w-lg">
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
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ delay: 0.6, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 px-8 py-3.5 rounded-full glass text-blush text-sm tracking-[0.25em] uppercase shadow-glow border border-rose-glow/30"
        >
          Reviva a nossa história.
        </motion.button>

        <p className="mt-16 text-muted-foreground text-xs tracking-widest uppercase opacity-60">
          Feito com amor
        </p>
      </div>
    </section>
  );
}
