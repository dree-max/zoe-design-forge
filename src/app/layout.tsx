import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollCinematic from "@/components/ScrollCinematic";

export const metadata: Metadata = {
  title: "ZOE DESIGNS FORGE. | Architectural & Interior Consultants | Kampala, Uganda",
  description:
    "ZOE DESIGNS FORGE. offers professional architectural design, master planning, interior design, and landscaping in Kampala, Uganda. Design. Build. Inspire.",
  keywords:
    "architectural design Uganda, interior design Kampala, landscape design, custom furniture, master planning, East Africa architecture",
  openGraph: {
    title: "ZOE DESIGNS FORGE. | Architectural & Interior Consultants",
    description: "Design. Build. Inspire. — Premium architectural design, interior design, and master planning across East Africa.",
    url: "https://www.zoeforge.com",
    siteName: "ZOE DESIGNS FORGE.",
    locale: "en_UG",
    type: "website",
  },
  metadataBase: new URL("https://www.zoeforge.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="icon" href="/icon-black.png" />
        <link rel="apple-touch-icon" href="/icon-black.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ProfessionalService"],
              name: "ZOE DESIGNS FORGE.",
              description: "Architectural & Interior Consultants",
              url: "https://www.zoeforge.com",
              telephone: "+256****0000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nansana Heights",
                addressLocality: "Kampala",
                addressCountry: "UG",
              },
              geo: { "@type": "GeoCoordinates", latitude: 0.3476, longitude: 32.5825 },
              areaServed: ["Kampala", "Uganda", "East Africa"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Architectural Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Design" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Master Planning" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscape Design" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Furniture" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Management" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <ScrollCinematic />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}