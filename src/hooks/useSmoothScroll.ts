import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  const ref = useRef<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
    ref.current = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return ref;
}
