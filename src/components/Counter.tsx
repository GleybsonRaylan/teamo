import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Starfield } from "./Starfield";

const START_DATE = new Date("2023-12-18T00:00:00");

function diff(now: Date) {
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prev;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months, days, hours, minutes, seconds };
}

export function Counter() {
  const [time, setTime] = useState(() => diff(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(diff(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const items: Array<[string, number]> = [
    ["Anos", time.years],
    ["Meses", time.months],
    ["Dias", time.days],
    ["Horas", time.hours],
    ["Minutos", time.minutes],
    ["Segundos", time.seconds],
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <Starfield density={50} />
      <div className="relative max-w-xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.4em] text-xs text-rose-glow mb-4"
        >
          Para Sempre
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-3xl sm:text-4xl text-blush text-glow-soft"
        >
          Todo esse tempo depois, e eu ainda escolheria você.
        </motion.h2>

        <div className="mt-12 grid grid-cols-3 gap-3">
          {items.map(([label, value]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl py-5 px-2 shadow-soft"
            >
              <div className="font-display text-3xl sm:text-4xl text-blush text-glow tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
