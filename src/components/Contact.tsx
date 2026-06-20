"use client";

import { brand } from "@/data/site";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from "@/lib/motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, connect to email/CRM
  };

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="container-site">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Let&apos;s Build Something Extraordinary</h2>
          <p className="section-subtitle mx-auto">
            Ready to start your project? Reach out and let&apos;s create spaces that inspire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/90 backdrop-blur-sm p-12 space-y-8">
              {[
                {
                  icon: "bi-geo-alt",
                  label: "Visit Our Studio",
                  value: brand.address,
                },
                {
                  icon: "bi-telephone",
                  label: "Call Us",
                  value: brand.phone,
                  href: `tel:${brand.phone}`,
                },
                {
                  icon: "bi-envelope",
                  label: "Email Us",
                  value: brand.email,
                  href: `mailto:${brand.email}`,
                },
                {
                  icon: "bi-whatsapp",
                  label: "WhatsApp",
                  value: "Chat with our team",
                  href: `https://wa.me/${brand.whatsapp}`,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <i className={`bi ${item.icon} text-brand-orange text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark mb-1">{item.label}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-brand-default hover:text-brand-orange transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-brand-default">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-white/90 backdrop-blur-sm mt-8 aspect-[16/9] flex items-center justify-center text-brand-default/40">
              <div className="text-center">
                <i className="bi bi-map text-4xl block mb-2"></i>
                <span className="text-sm">Map: Nansana Heights, Kampala</span>
              </div>
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <div className="bg-white/90 backdrop-blur-sm p-12 text-center">
                <i className="bi bi-check-circle text-5xl text-brand-orange block mb-4"></i>
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">
                  Thank You
                </h3>
                <p className="text-brand-default">
                  Your enquiry has been received. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm p-12 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg"
                      placeholder="+256"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                      Project Type *
                    </label>
                    <select
                      required
                      className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg"
                    >
                      <option value="">Select...</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="interior">Interior Design</option>
                      <option value="landscape">Landscape</option>
                      <option value="furniture">Custom Furniture</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                    Budget Range
                  </label>
                  <select className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg">
                    <option value="">Select...</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k-plus">$500,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border-2 border-brand-dark/10 px-4 py-3 focus:border-brand-orange focus:outline-none transition-colors bg-brand-gray-bg resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full text-center">
                  Send Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}