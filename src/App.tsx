import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { Counter } from "./components/Counter";
import { Gallery } from "./components/Gallery";
import { LoveLetter } from "./components/LoveLetter";
import { Playlist } from "./components/Playlist";
import { Final } from "./components/Final";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative bg-background text-foreground">
      <AnimatePresence>
        {!opened && (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 1 }}>
            <EnvelopeIntro recipient="My Love" onComplete={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Hero musicAutoplay />
          <Timeline />
          <Counter />
          <Gallery />
          <LoveLetter />
          <Playlist />
          <Final onReplay={() => setOpened(false)} />
        </motion.div>
      )}
    </main>
  );
}

export default App;
