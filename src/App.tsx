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
        className="md:w-md flex flex-col w-full p-4 bg-black shadow-2xl shadow-black border-[0.1px] border-zinc-900 h-2/3 rounded-2xl relative"
      >
        <p className="absolute flex items-center justify-between text-sm w-full top-0 left-0 p-4 font-mono text-zinc-600">
          <span>badgesss.com</span>
          <span>get yours now</span>
        </p>
        <div className="w-20 bg-zinc-900 shadow-2xl shadow-black h-1/2 absolute left-1/2 -translate-x-1/2 top-10 -translate-y-full"></div>
        {/* <svg
          width="inherit"
          height="inherit"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 absolute top-4 left-4"
        >
          <path
            d="M23.1849 16.4872C23.62 16.4872 23.9727 16.1279 23.9727 15.6848V1.80239C23.9727 1.35924 23.62 1 23.1849 1H20.1442C19.8892 1 19.65 1.12571 19.5022 1.33737L15.9495 6.42609C15.5048 7.06292 14.5197 6.74252 14.5197 5.96107V1.80239C14.5197 1.35924 14.1671 1 13.732 1H10.5366C10.2835 1 10.0458 1.12386 9.89776 1.33293L5.07572 8.14097C4.92764 8.35004 4.68996 8.4739 4.43687 8.4739H0.787746C0.352686 8.4739 0 8.83314 0 9.27629V15.6848C0 16.1279 0.352686 16.4872 0.787746 16.4872H3.98371C4.23648 16.4872 4.47389 16.3636 4.62202 16.155L8.10252 11.2529C8.55022 10.6224 9.52857 10.9449 9.52857 11.7231V15.6848C9.52857 16.1279 9.88126 16.4872 10.3163 16.4872H13.5123C13.7651 16.4872 14.0025 16.3636 14.1506 16.155L17.6311 11.2529C18.0788 10.6224 19.0571 10.9449 19.0571 11.7231V15.6848C19.0571 16.1279 19.4098 16.4872 19.8449 16.4872H23.1849Z"
            fill="currentColor"
          ></path>
          <path
            d="M0 1.80239C0 1.35924 0.352686 1 0.787746 1H4.12254C4.5576 1 4.91028 1.35924 4.91028 1.80239V5.19916C4.91028 5.64231 4.5576 6.00155 4.12254 6.00155H0.787746C0.352686 6.00155 0 5.64231 0 5.19916V1.80239Z"
            fill="currentColor"
          ></path>
          <path
            d="M0 19.2008C0 18.7577 0.352686 18.3984 0.787746 18.3984H23.2123C23.6473 18.3984 24 18.7577 24 19.2008V22.5976C24 23.0408 23.6473 23.4 23.2123 23.4H0.787746C0.352685 23.4 0 23.0408 0 22.5976V19.2008Z"
            fill="currentColor"
          ></path>
        </svg> */}
        <div className="w-28 bg-background rounded-full h-6 border-[0.1px] border-zinc-900 absolute top-5 left-1/2 -translate-x-1/2"></div>
        <p className="text-3xl leading-8 font-medium text-balance mt-[80%]">
          Eduardo
          <br />
          Serrano Rosete
        </p>
        <p className="font-mono text-sm mt-2">Virtual Attendee</p>
        <p className="text-xs text-zinc-600 font-mono mt-auto">
          badgess.com/get-yours
        </p>
        <div className="w-40 rounded-md overflow-hidden absolute bottom-4 right-4">
          <img src="/qr.png" alt="" />
        </div>
      </motion.div>
    </div>
  );
}
