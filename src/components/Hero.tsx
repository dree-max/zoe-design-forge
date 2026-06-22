"use client";

import { brand } from "@/data/site";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] opacity-[0.04] w-4/5 max-w-[800px] pointer-events-none">
        <img src="/WhiteLogo.png" alt="" className="w-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full">
        <motion.img
          src="/WhiteLogo.png"
          alt="Zoe Designs Forge"
          className="h-28 md:h-36 mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {brand.slogan.split(".")[0]}<span className="text-brand-orange italic">.</span>
          <br />
          {brand.slogan.split(".")[1]?.trim() || "Build. Inspire."}
        </motion.h2>

        <motion.p
          className="text-white/80 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          {brand.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Link href="/projects" className="btn-primary">
            View Our Work
          </Link>
          <Link href="/contact" className="btn-secondary">
            Start a Project
          </Link>
        </motion.div>

        {/* WhatsApp Floating */}
        <a
          href={`https://wa.me/${brand.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-lg hover:bg-brand-orange-hover transition-colors animate-bounce"
          aria-label="Chat on WhatsApp"
        >
          <i className="bi bi-whatsapp text-white text-2xl"></i>
        </a>
      </div>
    </section>
  );
}