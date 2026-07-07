import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const upd = () => setEnabled(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      const last = lastRef.current;
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      if (now - last.t > 40 && dist > 12) {
        lastRef.current = { x: e.clientX, y: e.clientY, t: now };
        const id = ++idRef.current;
        setTrail((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }]);
        window.setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== id));
        }, 900);
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest(
        "a,button,[role=button],input,textarea,select,label,summary,[data-cursor=hover]",
      );
      setHover(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.classList.add("cursor-none-all");
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[98] overflow-hidden">
        <AnimatePresence>
          {trail.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.55, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                left: p.x,
                top: p.y,
                transform: "translate3d(-50%, -50%, 0)",
                willChange: "transform, opacity",
              }}
              className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.45)_0%,rgba(129,140,248,0)_70%)]"
            />
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hover ? 0.4 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]"
        />
      </motion.div>
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hover ? 1.9 : 1,
            opacity: hover ? 0.9 : 0.55,
            borderColor: hover ? "rgba(129,140,248,0.9)" : "rgba(129,140,248,0.45)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="w-9 h-9 rounded-full border"
        />
      </motion.div>
    </>
  );
}