import { motion } from "framer-motion";
import { useState } from "react";

// ═══════════════════════════════════════
// IMPORTS SIMPLES DAS FOTOS
// ═══════════════════════════════════════

import foto1 from "@/assets/memory-1.jpg";
import foto2 from "@/assets/memory-2.jpg";
import foto3 from "@/assets/memory-3.jpg";
import foto4 from "@/assets/memory-4.jpg";
import fotoHero from "@/assets/hero-couple.png";

// ═══════════════════════════════════════
// ARRAY DE FOTOS (FÁCIL DE EDITAR)
// ═══════════════════════════════════════

const photos = [
  { src: foto4, caption: "Você" },
  { src: foto1, caption: "É" },
  { src: foto3, caption: "Minha" },
  { src: foto2, caption: "Melhor" },
  { src: fotoHero, caption: "Escolha" },
];

// ═══════════════════════════════════════
// COMPONENTE GALLERY
// ═══════════════════════════════════════

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="px-6 max-w-2xl mx-auto text-center mb-12">
        <p className="uppercase tracking-[0.4em] text-xs text-rose-glow mb-3">Polaroids</p>
        <h2 className="font-display text-4xl text-blush text-glow-soft">
          Eternizado Para <em className="text-rose-glow">Sempre</em>
        </h2>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-5 px-6 pb-6 min-w-max">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              className="shrink-0 w-60 bg-blush/95 p-3 pb-12 rounded-md shadow-soft relative"
              style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-display text-xl text-background italic">
                {p.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            src={photos[active].src}
            alt=""
            className="max-w-full max-h-[85vh] rounded-2xl shadow-glow"
          />
        </motion.div>
      )}
    </section>
  );
}
