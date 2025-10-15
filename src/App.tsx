import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";
import { useMobileTilt } from "./useMobileTilt";
export default function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Motion values for mouse position (centered: -0.5..0.5)
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);

  // Map offsets to rotation degrees (invert Y so pointer down -> rotateX down)
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);
  // Optional subtle scale when hovering
  const scale = useTransform(x, [-0.5, 0.5], [1.02, 1.02]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    // smooth reset to center
    x.set(0);
    y.set(0);
  };

  const { enableTilt } = useMobileTilt(x, y);

  return (
    <div
      onClick={enableTilt}
      ref={ref}
      style={{ perspective: 1000 }}
      className="w-full h-screen p-4 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="md:w-md w-full p-4 bg-red-500 shadow-2xl shadow-black border-[0.1px] border-zinc-900 h-2/3 rounded-2xl relative"
      >
        <div className="w-32 bg-background rounded-full h-7 border-[0.1px] border-zinc-900 absolute top-5 left-1/2 -translate-x-1/2"></div>
        <p className="mt-[80%] text-3xl font-medium text-balance">
          Eduardo
          <br />
          Serrano Rosete
        </p>
        <p className="font-mono text-sm mt-2">Virtual Attendee</p>
      </motion.div>
    </div>
  );
}
