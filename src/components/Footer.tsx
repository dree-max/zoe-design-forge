import { brand, navItems, services } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-dark-bg/90 backdrop-blur-md text-white/70">
      <div className="container-site px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-heading text-2xl font-bold mb-4">
              ZOE DESIGN FORGE<span className="text-brand-orange">.</span>
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              {brand.subtitle}
            </p>
            <div className="flex gap-4">
              {Object.entries(brand.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center 
                             hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
                >
                  <i className={`bi bi-${platform} text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navItems.filter((item) => item.label !== "Home").map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-brand-orange transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-brand-orange transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <i className="bi bi-geo-alt text-brand-orange mt-1"></i>
                <span>{brand.address}</span>
              </li>
              <li className="flex gap-3">
                <i className="bi bi-telephone text-brand-orange mt-1"></i>
                <a href={`tel:${brand.phone}`} className="hover:text-brand-orange transition-colors">
                  {brand.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <i className="bi bi-envelope text-brand-orange mt-1"></i>
                <a href={`mailto:${brand.email}`} className="hover:text-brand-orange transition-colors">
                  {brand.email}
                </a>
              </li>
              <li className="flex gap-3">
                <i className="bi bi-whatsapp text-brand-orange mt-1"></i>
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} ZOE DESIGN FORGE. All rights reserved.</p>
          <p className="text-white/40">
            Crafted with precision by{" "}
            <a
              href="https://moonlightaisolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-orange transition-colors"
            >
              MoonlightAI Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}