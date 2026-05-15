import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { VoiceMessageIntro } from "./components/VoiceMessageIntro";

import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { Counter } from "./components/Counter";
import { Gallery } from "./components/Gallery";
import { LoveLetter } from "./components/LoveLetter";
import { Playlist } from "./components/Playlist";
import { Final } from "./components/Final";

function App() {
  const [step, setStep] = useState<"envelope" | "voice" | "site">("envelope");

  return (
    <main className="relative bg-background text-foreground">
      <AnimatePresence mode="wait">
        {/* CARTA */}
        {step === "envelope" && (
          <motion.div
            key="intro"
            exit={{
              opacity: 0,
              scale: 1.05,
            }}
            transition={{
              duration: 1,
            }}
          >
            <EnvelopeIntro recipient="My Love" onComplete={() => setStep("voice")} />
          </motion.div>
        )}

        {/* RECADO DE VOZ */}
        {step === "voice" && (
          <motion.div
            key="voice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <VoiceMessageIntro onComplete={() => setStep("site")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SITE */}
      {step === "site" && (
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

          <Final onReplay={() => setStep("envelope")} />
        </motion.div>
      )}
    </main>
  );
}

export default App;
