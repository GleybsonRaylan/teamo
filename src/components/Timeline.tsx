import { motion } from "framer-motion";

// ═══════════════════════════════════════
// IMPORTS SIMPLES DAS FOTOS
// ═══════════════════════════════════════

import foto1 from "@/assets/memory-1.jpg";
import foto2 from "@/assets/memory-2.jpg";
import foto3 from "@/assets/memory-3.jpg";
import foto4 from "@/assets/memory-4.jpg";

// ═══════════════════════════════════════
// ARRAY DE MEMÓRIAS (FÁCIL DE EDITAR)
// ═══════════════════════════════════════

const memories = [
  {
    date: "Dom, 7 de Janeiro 2024",
    title: "Primeira Foto",
    text: "Dia que conheci sua familia",
    img: foto1,
  },
  {
    date: "Sáb, 19 de Julho 2025",
    title: "Seu grande dia amor",
    text: "",
    img: foto4,
  },
  {
    date: "Sáb, 19 de Outubro 2024",
    title: "Dia de Pizza kkkk",
    text: "",
    img: foto3,
  },
  {
    date: "Dom, 4 de Fev 2024",
    title: "Primeiro Passeio Juntos",
    text: "Dia que fomos para cachoeira",
    img: foto2,
  },
];

// ═══════════════════════════════════════
// COMPONENTE TIMELINE
// ═══════════════════════════════════════

export function Timeline() {
  return (
    <section id="timeline" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-romance pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-rose-glow mb-3">Capítulos</p>
          <h2 className="font-display text-4xl text-blush text-glow-soft">
            Momentos que <em className="text-rose-glow">nos definiu</em>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-glow/40 to-transparent" />
          <div className="absolute left-[22px] top-0 bottom-0 w-2 bg-rose-glow/10 blur-xl" />

          <div className="space-y-14">
            {memories.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16"
              >
                <div className="absolute left-3 top-3 w-7 h-7 rounded-full bg-gradient-to-br from-wine to-rose-glow shadow-glow flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blush" />
                </div>
                <div className="glass rounded-2xl overflow-hidden shadow-soft max-w-md">
                  {/* Mudei aspect-[4/3] para aspect-[3/4] - estilo retrato  */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-rose-glow">{m.date}</p>
                    <h3 className="font-display text-2xl text-blush mt-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
