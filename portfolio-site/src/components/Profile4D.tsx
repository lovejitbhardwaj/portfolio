"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";

type GlareStyle = MotionStyle & {
  "--gx"?: MotionValue<string> | string;
  "--gy"?: MotionValue<string> | string;
};

export function Profile4D({
  src = "/profile.jpg",
  alt = "Profile photo",
  size = 220,
}: {
  src?: string;
  alt?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.5 });

  // map mouse position in card (-0.5..0.5) -> degrees
  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const glareX = useTransform(sx, [-0.5, 0.5], ["25%", "75%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["25%", "75%"]);

  const glareStyle: GlareStyle = {
    background:
      "radial-gradient(220px 220px at var(--gx) var(--gy), rgba(255,255,255,.35), transparent 60%)",
    "--gx": glareX,
    "--gy": glareY,
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        className="relative rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_10px_rgba(255,255,255,0.02)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          mx.set(px);
          my.set(py);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* glow ring */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,.28), rgba(16,185,129,.18))",
          }}
        />

        {/* image */}
        <div
          className="relative mx-auto overflow-hidden rounded-3xl border border-white/10 bg-black/20"
          style={{
            width: size,
            height: size,
            transform: "translateZ(24px)",
          }}
        >
          {failed ? (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky-500/25 to-emerald-400/15">
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-tight text-white/90">LB</div>
                <div className="mt-1 text-xs text-white/70">Add /public/profile.jpg</div>
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={`${size}px`}
              className="object-cover"
              priority
              onError={() => setFailed(true)}
            />
          )}

          {/* animated glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
            style={glareStyle}
          />
        </div>

        <div
          className="mt-4 text-center text-sm text-zinc-300"
          style={{ transform: "translateZ(18px)" }}
        >
          Hover / move your mouse
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            transform: "translateZ(12px)",
            background:
              "radial-gradient(700px 350px at 50% 0%, rgba(56,189,248,.10), transparent 55%)",
          }}
        />
      </motion.div>
    </div>
  );
}
