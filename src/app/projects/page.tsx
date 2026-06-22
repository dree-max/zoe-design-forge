import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Portfolio | ZOE DESIGN FORGE.",
  description:
    "Browse our portfolio of architectural, interior, and landscape projects across East Africa — residential, commercial, and hospitality.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="h-24" />
      <Portfolio />
    </>
  );
}
