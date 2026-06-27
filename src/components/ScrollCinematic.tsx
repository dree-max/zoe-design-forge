"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/data/site";

const sceneImages = [
  "/images/hero-bg.jpg",
  ...projects.map((p) => p.images[0].src),
];

// Get an image or fallback to a solid color gradient
function getImageUrl(index: number): string {
  return sceneImages[index % sceneImages.length] || "";
}

export default function ScrollCinematic() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);

  // Auto-slideshow timer
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      const next = (currentIdx + 1) % sceneImages.length;
      setNextIdx(next);
      setTimeout(() => {
        setCurrentIdx(next);
        setNextIdx(null);
      }, 1000);
    }, 8000); // new image every 8 seconds

    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [currentIdx]);

  // Track scroll position and active section
  const ticking = useRef(false);

  useEffect(() => {
    const sectionIds = ["hero", "about", "services", "portfolio", "team", "contact"];

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

          let maxIdx = 0;
          let maxVis = 0;
          sectionIds.forEach((id, i) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vis = Math.max(0, Math.min(1,
              (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / window.innerHeight
            ));
            if (vis > maxVis) { maxVis = vis; maxIdx = i; }
          });

          setActiveSection(sectionIds[maxIdx]);

          // When entering a new section, trigger a scene change
          if (maxIdx > 0 && maxIdx !== currentIdx % sceneImages.length) {
            const sceneTarget = maxIdx % sceneImages.length;
            if (sceneTarget !== currentIdx && sceneTarget !== nextIdx) {
              setNextIdx(sceneTarget);
              setTimeout(() => {
                setCurrentIdx(sceneTarget);
                setNextIdx(null);
              }, 1000);
            }
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIdx, nextIdx]);

  // Section-specific overlay opacity
  const getOverlay = (section: string) => {
    const map: Record<string, number> = {
      hero: 0.4,
      about: 0.3,
      services: 0.35,
      portfolio: 0.3,
      team: 0.35,
      contact: 0.3,
    };
    return map[section] ?? 0.35;
  };

  const overlay = getOverlay(activeSection);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      {/* Current image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out will-change-transform"
        style={{
          backgroundImage: `url(${getImageUrl(currentIdx)})`,
          transform: `scale(${1 + progress * 0.06})`,
        }}
      />

      {/* Crossfade to next image */}
      {nextIdx !== null && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-out will-change-transform"
          style={{
            backgroundImage: `url(${getImageUrl(nextIdx)})`,
            opacity: 0.4,
            transform: `scale(${1 + (progress + 0.02) * 0.06})`,
          }}
        />
      )}

      {/* Gradient overlay — shifts with active section */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg,
            rgba(0,0,0,${overlay + 0.15}) 0%,
            rgba(0,0,0,${overlay}) 40%,
            rgba(0,0,0,${overlay + 0.1}) 100%)`,
        }}
      />

      {/* Scene progress dots */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-1.5">
        {sceneImages.slice(0, 8).map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-700 ${
              i === currentIdx % 8
                ? "bg-white w-4 h-2"
                : "bg-white/30 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}