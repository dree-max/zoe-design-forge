"use client";

import { team } from "@/data/site";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section id="team" className="section-padding bg-transparent">
      <div className="container-site">
          <div className="bg-white/90 backdrop-blur-sm text-center mb-16 p-12">
          <span className="section-label">Our Team</span>
          <h2 className="section-title">The People Behind the Work</h2>
          <p className="section-subtitle mx-auto">
            A team of registered professionals committed to design excellence and engineering integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white/90 backdrop-blur-sm p-8 text-center group hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Avatar placeholder */}
              <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-brand-dark flex items-center justify-center text-white text-3xl font-heading font-bold group-hover:bg-brand-orange transition-colors duration-500">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-dark mb-1">
                {member.name}
              </h3>
              <p className="text-brand-orange font-semibold text-sm mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-brand-default text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {member.qualifications.map((q, i) => (
                  <span
                    key={i}
                    className="text-xs bg-brand-orange/10 text-brand-orange px-3 py-1"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}