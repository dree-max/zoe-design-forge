import About from "@/components/About";
import Team from "@/components/Team";

export const metadata = {
  title: "About Us | ZOE DESIGN FORGE.",
  description:
    "Learn about ZOE DESIGN FORGE — our mission, our story, and the team of professionals behind exceptional architectural and interior design in East Africa.",
};

export default function AboutPage() {
  return (
    <>
      <div className="h-24" />
      <About />
      <Team />
    </>
  );
}
