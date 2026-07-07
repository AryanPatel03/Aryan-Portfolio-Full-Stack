import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06060b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15),_transparent_60%)]" />
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/40 blur-2xl" />
              <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-space font-bold text-3xl text-white">
                AV
              </div>
            </motion.div>

            <div className="w-64 flex flex-col gap-3">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
                <span className="text-zinc-500">Loading</span>
                <span className="text-indigo-300 tabular-nums">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}