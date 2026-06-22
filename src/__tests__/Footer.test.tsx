import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getAllByText(/ZOE DESIGN FORGE/).length).toBeGreaterThan(0);
  });

  it("renders quick links section with route hrefs", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    const aboutLinks = screen.getAllByText("About");
    const quickAbout = aboutLinks.find((el) =>
      el.closest("a")?.getAttribute("href") === "/about"
    );
    expect(quickAbout).toBeTruthy();

    const servicesLinks = screen.getAllByText("Services");
    const quickServices = servicesLinks.find((el) =>
      el.closest("a")?.getAttribute("href") === "/services"
    );
    expect(quickServices).toBeTruthy();

    const portfolioLinks = screen.getAllByText("Portfolio");
    const quickPortfolio = portfolioLinks.find((el) =>
      el.closest("a")?.getAttribute("href") === "/projects"
    );
    expect(quickPortfolio).toBeTruthy();
  });

  it("renders services list linking to /services", () => {
    render(<Footer />);
    expect(screen.getByText("Architectural Design")).toBeInTheDocument();
    expect(screen.getByText("Interior Design")).toBeInTheDocument();
    expect(screen.getByText("Master Planning")).toBeInTheDocument();
    expect(screen.getByText("Landscape Design")).toBeInTheDocument();
    expect(screen.getByText("Custom Furniture")).toBeInTheDocument();
    expect(screen.getByText("Project Management")).toBeInTheDocument();

    const archLink = screen.getByText("Architectural Design").closest("a");
    expect(archLink).toHaveAttribute("href", "/services");
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("info@zoeforge.com")).toBeInTheDocument();
    expect(screen.getByText("+256 700 000 000")).toBeInTheDocument();
    expect(screen.getByText("Nansana Heights, Kampala, Uganda")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("target") === "_blank"
    );
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it("renders WhatsApp link", () => {
    render(<Footer />);
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    const whatsappLink = screen.getByText("WhatsApp").closest("a");
    expect(whatsappLink).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
  });

  it("credits MoonlightAI Solutions", () => {
    render(<Footer />);
    expect(screen.getByText("MoonlightAI Solutions")).toBeInTheDocument();
    const creditLink = screen.getByText("MoonlightAI Solutions").closest("a");
    expect(creditLink).toHaveAttribute("href", "https://moonlightaisolutions.com");
  });
});
