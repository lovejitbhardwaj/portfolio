"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

async function imageUrlToDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const blob = await res.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

type PhotoBase64BackdropProps = {
  src: string;
  alt?: string;
};

export function PhotoBase64Backdrop({ src }: PhotoBase64BackdropProps) {
  const reduceMotion = useReducedMotion();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    imageUrlToDataUrl(src)
      .then((d) => {
        if (!cancelled) setDataUrl(d);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const bgImage = useMemo(() => {
    if (!dataUrl) return undefined;
    return `url('${dataUrl}')`;
  }, [dataUrl]);

  // If the user hasn't added the photo yet, don't break the UI.
  if (failed) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_10%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* 4D-ish animated photo orb */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[18%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.15) contrast(1.05)",
          opacity: dataUrl ? 0.16 : 0,
          mixBlendMode: "screen",
        }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={
          reduceMotion
            ? { opacity: dataUrl ? 0.16 : 0 }
            : {
                opacity: dataUrl ? 0.16 : 0,
                y: [0, -12, 0],
                rotate: [0, 2.5, 0],
                scale: [1, 1.02, 1],
              }
        }
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* neon glow layers */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[18%] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,.20), transparent 65%), radial-gradient(closest-side, rgba(168,85,247,.16), transparent 70%), radial-gradient(closest-side, rgba(16,185,129,.14), transparent 70%)",
          opacity: 0.75,
        }}
        animate={reduceMotion ? undefined : { rotate: [0, 8, 0] }}
        transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* fade bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)]" />
    </div>
  );
}
