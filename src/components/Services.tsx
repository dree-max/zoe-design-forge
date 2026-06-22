"use client";

import { services } from "@/data/site";
import { motion } from "framer-motion";
import { withStaggerDelay } from "@/lib/motion";
import SectionHeader from "@/components/SectionHeader";

export default function Services() {
  return (
    <section id="services" className="section-padding bg-transparent">
      <div className="container-site">
        <SectionHeader
          label="Our Services"
          title="What We Do"
          subtitle="Comprehensive architectural and engineering services from concept to completion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white/90 backdrop-blur-sm p-8 group hover:shadow-xl transition-all duration-500 cursor-default"
              {...withStaggerDelay(index)}
            >
              <div className="w-14 h-14 bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-500">
                <i className={`bi ${service.icon} text-2xl text-brand-orange group-hover:text-white transition-colors duration-500`}></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-dark mb-4">
                {service.title}
              </h3>
              <p className="text-brand-default leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.process.slice(0, 3).map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-default">
                    <span className="text-brand-orange mt-1">—</span>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
