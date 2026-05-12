import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import foto1 from "../assets/memory-1.jpg";
import foto2 from "../assets/memory-2.jpg";
import foto3 from "../assets/memory-3.jpg";
import foto4 from "../assets/memory-4.jpg";
import fotoHero from "../assets/hero-couple.png";

const photos = [
  { src: foto4, caption: "Você" },
  { src: foto1, caption: "É" },
  { src: foto3, caption: "Minha" },
  { src: foto2, caption: "Melhor" },
  { src: fotoHero, caption: "Escolha" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-rose-glow">Polaroids</p>

        <h2 className="font-display text-4xl text-blush text-glow-soft">
          Eternizado Para <em className="text-rose-glow">Sempre</em>
        </h2>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex min-w-max gap-4 px-6 pb-6 sm:gap-5">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.06 }}
              whileHover={{
                y: -8,
                rotate: 0,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="relative w-52 shrink-0 rounded-md bg-blush/95 p-3 pb-11 shadow-soft sm:w-60 sm:pb-12"
              style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="absolute bottom-3 left-0 right-0 text-center font-display text-xl italic text-background">
                {p.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-md sm:backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              src={photos[active].src}
              alt={photos[active].caption}
              loading="eager"
              decoding="async"
              className="max-h-[82vh] max-w-full rounded-2xl shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
