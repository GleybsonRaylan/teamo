import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import memory1 from "../assets/estrela.png";
import memory2 from "../assets/estrela.png";
import memory3 from "../assets/estrela.png";
import memory4 from "../assets/estrela.png";

import shop from "../assets/shop.jpg";
import shop2 from "../assets/shop2.jpg";
import foto1 from "../assets/1.jpg";
import ca from "../assets/ca.jpg";
import ca2 from "../assets/ca2.jpg";
import video1 from "../assets/video1.mp4";
import colacao from "../assets/colacao.jpg";
import colacao2 from "../assets/colacao2.jpg";
import pizza from "../assets/pizza.jpg";
import pizza2 from "../assets/pizza2.jpg";
import pis from "../assets/pis.jpg";
import pis2 from "../assets/pis2.jpg";
import pis3 from "../assets/pis3.jpg";
import praia from "../assets/praia.jpg";
import romaria from "../assets/romaria.jpg";

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
    gallery: [ca, ca2],
    audio: null,
    video: video1,
    position: { x: 40, y: 45 },
  },
  {
    id: 4,
    title: "Nosso Lugar Favorito",
    date: "Sáb 18 de Janeiro de 2025",
    text: "Aquele lugar sempre vai carregar um pedaço da gente. Nossas risadas ainda ecoam por lá.",
    image: memory4,
    gallery: [pizza, pizza2],
    audio: null,
    video: null,
    position: { x: 75, y: 55 },
  },
  {
    id: 5,
    title: "Colação",
    date: "27 de Agosto 2024",
    text: "So consigo lembrar o quanto voce tava linda",
    image: memory1,
    gallery: [colacao, colacao2],
    audio: null,
    video: null,
    position: { x: 15, y: 60 },
  },
  {
    id: 6,
    title: "Dia de Piscina",
    date: "Dom 4 de Janeiro de 2026",
    text: "Ao seu lado qualquer lugar vira especial",
    image: memory2,
    gallery: [pis, pis2, pis3],
    audio: null,
    video: null,
    position: { x: 50, y: 70 },
  },
  {
    id: 7,
    title: "",
    date: "",
    text: "",
    image: memory3,
    gallery: [romaria],
    audio: null,
    video: null,
    position: { x: 85, y: 75 },
  },
  {
    id: 8,
    title: "",
    date: "",
    text: "",
    image: memory4,
    gallery: [praia],
    audio: null,
    video: null,
    position: { x: 30, y: 80 },
  },
];

const starImages = [memory1, memory2, memory3, memory4];

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: 8 + ((i * 9.3) % 84),
      top: 8 + ((i * 11.1) % 84),
      size: 1.5 + (i % 3),
      opacity: 0.16 + (i % 4) * 0.04,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `oklch(0.85 0.06 15 / ${p.opacity})`,
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
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      whileTap={{ scale: 0.94 }}
      onClick={() => onClick(memory)}
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${memory.position.x}%`,
        top: `${memory.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={`Memória: ${memory.title}`}
    >
      <div className="relative">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-rose-glow/40 shadow-[0_0_14px_rgba(251,113,133,0.28)] md:h-12 md:w-12">
          <img
            src={starImageUrl}
            alt={`Estrela ${index + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-rose-glow/20 to-transparent" />
        </div>

        <div className="absolute -inset-1 rounded-full bg-rose-glow/10 blur-md" />
      </div>
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
  }, []);

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
      {linePairs.map((pair, index) => (
        <motion.line
          key={pair.id}
          x1={`${pair.from.x}%`}
          y1={`${pair.from.y}%`}
          x2={`${pair.to.x}%`}
          y2={`${pair.to.y}%`}
          stroke="oklch(0.65 0.2 18 / 0.38)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3 + index * 0.05,
          }}
        />
      ))}
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/90 p-3"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative my-auto w-full max-w-lg overflow-hidden rounded-3xl shadow-soft"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-background/80 p-2.5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-wine/20 to-transparent">
          <AnimatePresence mode="wait">
            {currentMedia.type === "image" ? (
              <motion.img
                key={currentMedia.src}
                src={currentMedia.src}
                alt={memory.title}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                loading="eager"
                decoding="async"
              />
            ) : (
              <motion.video
                key={currentMedia.src}
                src={currentMedia.src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full bg-black object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {mediaItems.length > 1 && (
            <>
              {currentMediaIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/70 p-3 text-white transition-colors hover:bg-background/90"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {currentMediaIndex < mediaItems.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/70 p-3 text-white transition-colors hover:bg-background/90"
                  aria-label="Próximo"
                >
                  <ChevronRight size={22} />
                </button>
              )}

              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {mediaItems.map((item, idx) => (
                  <button
                    key={`${item.type}-${idx}`}
                    onClick={() => setCurrentMediaIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentMediaIndex ? "w-6 bg-rose-glow" : "w-2 bg-white/40"
                    }`}
                    aria-label={`Ir para ${item.type === "video" ? "vídeo" : "imagem"} ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4 p-6">
          <div>
            <h3 className="mb-1 font-display text-2xl text-blush md:text-3xl">{memory.title}</h3>

            <p className="text-sm font-light tracking-wider text-rose-glow/60">{memory.date}</p>
          </div>

          <p className="text-base font-light leading-relaxed text-muted-foreground">
            {memory.text}
          </p>

          {mediaItems.length > 1 && (
            <p className="pt-2 text-center text-xs text-muted-foreground/40">
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAllStarsVisible(true);
    }, 300);

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
    <section className="relative overflow-hidden bg-romance px-6 py-24">
      <Particles />

      <div className="relative z-10 mx-auto max-w-lg">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-glow/60" />

              <span className="font-sans text-xs font-light uppercase tracking-[0.5em] text-rose-glow/50">
                Nossa História
              </span>

              <Sparkles className="h-5 w-5 text-rose-glow/60" />
            </div>

            <h2 className="mb-4 font-display text-4xl font-light leading-tight text-glow-soft md:text-5xl">
              <span className="text-blush">Constelação</span>
              <br />
              <span className="font-medium text-rose-glow">Nosso Amor</span>
            </h2>

            <p className="mx-auto max-w-xs text-sm font-light tracking-wide text-muted-foreground">
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

            <div
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
              style={{
                background: "oklch(0.65 0.2 18 / 0.08)",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="relative px-4 font-display text-xl font-light leading-relaxed text-blush/80 text-glow-soft md:text-2xl">
            Em qualquer universo,
            <br />
            <span className="font-medium text-rose-glow">eu encontraria você.</span>
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.65 0.2 18 / 0.4), transparent)",
            }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMemory && <MemoryModal memory={selectedMemory} onClose={handleCloseModal} />}
      </AnimatePresence>
    </section>
  );
}
