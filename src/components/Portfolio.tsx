"use client";

import { projects } from "@/data/site";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const categories = ["All", "Residential", "Commercial", "Hospitality", "Furniture"];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding bg-transparent">
      <div className="container-site">
        <SectionHeader
          label="Our Portfolio"
          title="Featured Projects"
          subtitle="Every project tells a story. Explore our work across East Africa."
          className="mb-12"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider border-2 border-brand-dark/10 
                transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "text-brand-default hover:border-brand-orange"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )}
              >
                <div className="relative overflow-hidden mb-4 aspect-[4/3] bg-brand-gray-bg">
                  <div className="w-full h-full flex items-center justify-center text-brand-default/30">
                    <div className="text-center p-4">
                      <i className="bi bi-image text-4xl block mb-2"></i>
                      <span className="text-sm">{project.title}</span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center text-white">
                      <i className="bi bi-arrows-angle-expand text-3xl mb-2 block"></i>
                      <span className="text-sm uppercase tracking-wider">View Project</span>
                    </div>
                  </div>
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs px-3 py-1 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-dark mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-brand-default">
                  {project.location} · {project.year}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expanded Project Detail */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 overflow-hidden"
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedProject);
                if (!project) return null;
                return (
                  <div className="border-t-2 border-brand-dark/10 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-3xl font-heading font-bold text-brand-dark mb-4">
                          {project.title}
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                          <div>
                            <span className="block text-brand-orange font-semibold uppercase tracking-wider mb-1">Location</span>
                            {project.location}
                          </div>
                          <div>
                            <span className="block text-brand-orange font-semibold uppercase tracking-wider mb-1">Year</span>
                            {project.year}
                          </div>
                          <div>
                            <span className="block text-brand-orange font-semibold uppercase tracking-wider mb-1">Category</span>
                            {project.category}
                          </div>
                        </div>
                        <p className="text-brand-default leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <p className="text-sm text-brand-default">
                          <span className="font-semibold text-brand-dark">Scope:</span> {project.scope}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {project.images.map((img, i) => (
                          <div key={i} className="aspect-square bg-brand-gray-bg flex items-center justify-center text-brand-default/30">
                            <i className="bi bi-image text-2xl"></i>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}