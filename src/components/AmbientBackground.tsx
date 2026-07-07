import { motion, useReducedMotion } from "framer-motion";

/**
 * Site-wide ambient layer: soft aurora blobs, subtle grain and a fine grid.
 * Fixed, pointer-events-none, sits behind everything (-z-10 on <main>) but
 * above the flat page background. Adds cinematic depth without changing any
 * section markup.
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
    >
      {/* Aurora blobs — drift slowly across the viewport */}
      <motion.div
        initial={{ x: "-10%", y: "-10%" }}
        animate={reduce ? undefined : { x: ["-10%", "8%", "-6%", "-10%"], y: ["-10%", "6%", "-4%", "-10%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_65%)] blur-3xl"
      />
      <motion.div
        initial={{ x: "0%", y: "0%" }}
        animate={reduce ? undefined : { x: ["0%", "-10%", "6%", "0%"], y: ["0%", "8%", "-6%", "0%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)] blur-3xl"
      />
      <motion.div
        initial={{ x: "0%", y: "0%" }}
        animate={reduce ? undefined : { x: ["0%", "10%", "-4%", "0%"], y: ["0%", "-8%", "6%", "0%"] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-25%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_65%)] blur-3xl"
      />

      {/* Fine grid — very low opacity, gives a sense of surface */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* Grain — SVG-generated, tiles seamlessly */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
