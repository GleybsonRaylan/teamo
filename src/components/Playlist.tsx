import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import memory1 from "../assets/memory-1.jpg";
import memory2 from "../assets/memory-2.jpg";
import memory3 from "../assets/memory-3.jpg";
import memory4 from "../assets/memory-4.jpg";

import shop from "../assets/shop.jpg";
import shop2 from "../assets/shop2.jpg";
import foto1 from "../assets/1.jpg";
import cachoeira from "../assets/cachoeria.jpg";
import cachoeira2 from "../assets/cachoeira2.jpg";
import video1 from "../assets/video1.mp4";

type Memory = {
  id: number;
  title: string;
  date: string;
  text: string;
  image: string;
  gallery: string[];
  audio: string | null;
  video: string | null;
  position: {
    x: number;
    y: number;
  };
};

type MediaItem = {
  type: "image" | "video";
  src: string;
};

const memories: Memory[] = [
  {
    id: 1,
    title: "Nosso Primeiro Encontro",
    date: "Seg, 13 de Novembro de 2023",
    text: "Foi nesse dia que eu percebi que existia algo diferente em você.",
    image: memory1,
    gallery: [shop, shop2],
    audio: null,
    video: null,
    position: { x: 20, y: 15 },
  },
  {
    id: 2,
    title: "Primeiro Passeio",
    date: "Dom, 7 de Janeiro 2024",
    text: "Está eternizado na minha memória.",
    image: foto1,
    gallery: [],
    audio: null,
    video: null,
    position: { x: 65, y: 25 },
  },
  {
    id: 3,
    title: "Nossa Primeira Viagem",
    date: "Dom, 4 de Fevereiro de 2024",
    text: "Descobrimos que juntos qualquer lugar se torna especial.",
    image: memory3,
    gallery: [cachoeira, cachoeira2],
    audio: null,
    video: video1,
    position: { x: 40, y: 45 },
  },
  {
    id: 4,
    title: "Nosso Lugar Favorito",
    date: "5 de Julho de 2023",
    text: "Aquele lugar sempre vai carregar um pedaço da gente. Nossas risadas ainda ecoam por lá.",
    image: memory4,
    gallery: [],
    audio: null,
    video: null,
    position: { x: 75, y: 55 },
  },
  {
    id: 5,
    title: "O Pedido",
    date: "14 de Fevereiro de 2024",
    text: "O dia em que o 'eu' se tornou 'nós' oficialmente. As estrelas foram testemunhas do nosso amor.",
    image: memory1,
    gallery: [memory1, memory2],
    audio: null,
    video: null,
    position: { x: 15, y: 60 },
  },
  {
    id: 6,
    title: "Nossa Primeira Dança",
    date: "14 de Fevereiro de 2024",
    text: "Dançamos como se ninguém estivesse vendo. Na verdade, só existia nós dois no universo.",
    image: memory2,
    gallery: [],
    audio: null,
    video: null,
    position: { x: 50, y: 70 },
  },
  {
    id: 7,
    title: "Dia de Chuva",
    date: "3 de Março de 2024",
    text: "Ficamos horas debaixo da coberta, ouvindo a chuva e compartilhando sonhos.",
    image: memory3,
    gallery: [],
    audio: null,
    video: null,
    position: { x: 85, y: 75 },
  },
  {
    id: 8,
    title: "Nosso Filme Favorito",
    date: "20 de Abril de 2024",
    text: "Assistimos tantas vezes que já sabemos as falas de cor. Mas sempre choramos na mesma cena.",
    image: memory4,
    gallery: [memory4],
    audio: null,
    video: null,
    position: { x: 30, y: 80 },
  },
];

const starImages = [memory1, memory2, memory3, memory4];

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: 5 + ((i * 5.3) % 90),
      top: 5 + ((i * 7.1) % 90),
      delay: (i * 0.7) % 5,
      size: 1.5 + (i % 3),
      opacity: 0.15 + (i % 5) * 0.05,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `oklch(0.85 0.06 15 / ${p.opacity * 1.5})`,
          }}
          animate={{
            opacity: [p.opacity, p.opacity * 0.5, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (p.id % 3),
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

type StarProps = {
  memory: Memory;
  index: number;
  onClick: (memory: Memory) => void;
  isVisible: boolean;
};

function Star({ memory, index, onClick, isVisible }: StarProps) {
  const starImageUrl = starImages[index % starImages.length];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(memory)}
      className="absolute z-10 cursor-pointer group"
      style={{
        left: `${memory.position.x}%`,
        top: `${memory.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={`Memória: ${memory.title}`}
    >
      <motion.div
        className="relative"
        animate={{
          filter: [
            "drop-shadow(0 0 6px oklch(0.65 0.2 18 / 0.4))",
            "drop-shadow(0 0 12px oklch(0.65 0.2 18 / 0.6))",
            "drop-shadow(0 0 6px oklch(0.65 0.2 18 / 0.4))",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-rose-glow/30 group-hover:border-rose-glow/60 transition-all duration-500">
          <img
            src={starImageUrl}
            alt={`Estrela ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-rose-glow/20 to-transparent mix-blend-overlay" />
        </div>

        <motion.div
          className="absolute -inset-2 rounded-full bg-rose-glow/10 blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      </motion.div>
    </motion.button>
  );
}

type ConstellationLinesProps = {
  memories: Memory[];
  isVisible: boolean;
};

function ConstellationLines({ memories, isVisible }: ConstellationLinesProps) {
  const linePairs = useMemo(() => {
    return memories.slice(0, -1).map((memory, i) => ({
      from: memory.position,
      to: memories[i + 1].position,
      id: `line-${i}`,
    }));
  }, [memories]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <AnimatePresence>
        {linePairs.map((pair, index) => (
          <motion.line
            key={pair.id}
            x1={`${pair.from.x}%`}
            y1={`${pair.from.y}%`}
            x2={`${pair.to.x}%`}
            y2={`${pair.to.y}%`}
            stroke="url(#constellationGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.8 + index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      <defs>
        <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.65 0.2 18 / 0.3)" />
          <stop offset="50%" stopColor="oklch(0.65 0.2 18 / 0.5)" />
          <stop offset="100%" stopColor="oklch(0.65 0.2 18 / 0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type MemoryModalProps = {
  memory: Memory;
  onClose: () => void;
};

function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);

  const mediaItems = useMemo<MediaItem[]>(() => {
    const images = memory.gallery.length ? memory.gallery : [memory.image];

    const imageItems: MediaItem[] = images.map((src) => ({
      type: "image",
      src,
    }));

    if (memory.video) {
      imageItems.push({
        type: "video",
        src: memory.video,
      });
    }

    return imageItems;
  }, [memory]);

  const currentMedia = mediaItems[currentMediaIndex];

  const goToPrevious = useCallback(() => {
    setCurrentMediaIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentMediaIndex((prev) => Math.min(prev + 1, mediaItems.length - 1));
  }, [mediaItems.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setSwipeStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (swipeStart === null) return;

      const swipeEnd = e.changedTouches[0].clientX;
      const diff = swipeStart - swipeEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }

      setSwipeStart(null);
    },
    [swipeStart, goToNext, goToPrevious],
  );

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [memory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 bg-background/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-lg rounded-3xl overflow-hidden shadow-soft my-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-background/70 backdrop-blur-sm border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-wine/20 to-transparent overflow-hidden">
          <AnimatePresence mode="wait">
            {currentMedia.type === "image" ? (
              <motion.img
                key={currentMedia.src}
                src={currentMedia.src}
                alt={memory.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
            ) : (
              <motion.video
                key={currentMedia.src}
                src={currentMedia.src}
                controls
                playsInline
                className="w-full h-full object-cover bg-black"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {mediaItems.length > 1 && (
            <>
              {currentMediaIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-3 rounded-full bg-background/60 backdrop-blur-sm text-white hover:bg-background/80 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {currentMediaIndex < mediaItems.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-3 rounded-full bg-background/60 backdrop-blur-sm text-white hover:bg-background/80 transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight size={22} />
                </button>
              )}

              <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
                {mediaItems.map((item, idx) => (
                  <button
                    key={`${item.type}-${idx}`}
                    onClick={() => setCurrentMediaIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentMediaIndex
                        ? "w-6 bg-rose-glow"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Ir para ${item.type === "video" ? "vídeo" : "imagem"} ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-display text-blush mb-1"
            >
              {memory.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-rose-glow/60 font-light tracking-wider"
            >
              {memory.date}
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground leading-relaxed font-light"
          >
            {memory.text}
          </motion.p>

          {mediaItems.length > 1 && (
            <p className="text-xs text-muted-foreground/40 text-center pt-2">
              ← deslize ou use as setas para ver mais →
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Playlist() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [allStarsVisible, setAllStarsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.95, 1]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAllStarsVisible(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const handleStarClick = useCallback((memory: Memory) => {
    setSelectedMemory(memory);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMemory(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-romance">
      <Particles />

      <motion.div className="relative z-10 max-w-lg mx-auto" style={{ opacity, scale }}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-rose-glow/60" />

              <span className="text-xs tracking-[0.5em] text-rose-glow/50 uppercase font-light font-sans">
                Nossa História
              </span>

              <Sparkles className="w-5 h-5 text-rose-glow/60" />
            </div>

            <h2 className="font-display font-light text-4xl md:text-5xl text-glow-soft mb-4 leading-tight">
              <span className="text-blush">Constelação do</span>
              <br />
              <span className="text-rose-glow font-medium">Nosso Amor</span>
            </h2>

            <p className="text-sm text-muted-foreground font-light tracking-wide max-w-xs mx-auto">
              Cada estrela guarda um pedaço da nossa história. Toque nelas para reviver cada
              momento.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <div className="absolute inset-0">
            <ConstellationLines memories={memories} isVisible={allStarsVisible} />

            {memories.map((memory, index) => (
              <Star
                key={memory.id}
                memory={memory}
                index={index}
                onClick={handleStarClick}
                isVisible={allStarsVisible}
              />
            ))}

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl"
              style={{ background: "oklch(0.65 0.2 18 / 0.08)" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mt-20"
        >
          <p className="relative text-xl md:text-2xl font-display font-light text-blush/80 leading-relaxed px-4 text-glow-soft">
            Em qualquer universo,
            <br />
            <span className="font-medium text-rose-glow">eu encontraria você.</span>
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.65 0.2 18 / 0.4), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedMemory && <MemoryModal memory={selectedMemory} onClose={handleCloseModal} />}
      </AnimatePresence>
    </section>
  );
}
