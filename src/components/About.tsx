"use client";

import { brand } from "@/data/site";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="section-padding bg-transparent">
      <div className="container-site">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" {...fadeUp}>
          <div className="bg-white/90 backdrop-blur-sm p-12">
            <span className="section-label">About Us</span>
            <h2 className="section-title">
              Architects of Vision,<br />Engineers of Reality
            </h2>
            <p className="text-brand-default text-lg leading-relaxed mb-6">
              {brand.mission}
            </p>
            <p className="text-brand-default leading-relaxed mb-8">
              At ZOE DESIGN FORGE, we bring together architectural creativity and engineering
              precision. Every project we undertake is a partnership — we listen, we envision,
              and we deliver spaces that inspire, function, and endure.
            </p>
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { number: "15+", label: "Years Experience" },
                { number: "200+", label: "Projects Completed" },
                { number: "50+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-heading font-bold text-brand-orange mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-brand-default uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-brand-gray-bg">
              <div className="w-full h-full flex items-center justify-center text-brand-default/30 text-lg">
                <img
                  src="/images/about-placeholder.jpg"
                  alt="ZOE DESIGN FORGE studio"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
            {/* Accent box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-orange hidden lg:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}