import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  blur: number;
  opacity: number;
}

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 28 }: ParticlesProps) {
  const [items, setItems] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 3,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 10,
      drift: Math.random() * 80 - 40,
      blur: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.35,
    }));

    setItems(generated);
  }, [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,180,190,0.16), transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: -40,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background:
              "radial-gradient(circle, rgba(255,230,235,0.95) 0%, rgba(255,150,170,0.55) 45%, transparent 75%)",
            boxShadow: "0 0 12px rgba(255,170,185,0.55), 0 0 24px rgba(255,160,180,0.25)",
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            y: [0, -220, -480, -760],
            x: [0, p.drift * 0.4, -p.drift * 0.25, p.drift],
            scale: [0.6, 1, 0.85, 0.2],
            opacity: [0, p.opacity, p.opacity * 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
