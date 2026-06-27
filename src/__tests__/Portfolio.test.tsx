import { render, screen, fireEvent } from "@testing-library/react";
import Portfolio from "@/components/Portfolio";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, layout, exit, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Portfolio", () => {
  it("renders the section heading", () => {
    render(<Portfolio />);
    expect(screen.getByText("Our Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders filter buttons", () => {
    render(<Portfolio />);
    const buttons = screen.getAllByRole("button");
    const buttonTexts = buttons.map((b) => b.textContent);
    expect(buttonTexts).toContain("All");
    expect(buttonTexts).toContain("Residential");
    expect(buttonTexts).toContain("Commercial");
    expect(buttonTexts).toContain("Hospitality");
    expect(buttonTexts).toContain("Furniture");
  });

  it("shows all projects by default", () => {
    render(<Portfolio />);
    expect(screen.getAllByText("KMT Plaza Nansana").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Kyankwazi Country Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Apartments Garuga Entebbe").length).toBeGreaterThan(0);
  });

  it("filters projects by category when a filter is clicked", () => {
    render(<Portfolio />);

    const commercialBtn = screen.getAllByRole("button").find((b) => b.textContent === "Commercial");
    if (commercialBtn) fireEvent.click(commercialBtn);

    expect(screen.getAllByText("KMT Plaza Nansana").length).toBeGreaterThan(0);
    expect(screen.queryByText("Kyankwazi Country Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Apartments Garuga Entebbe")).not.toBeInTheDocument();
  });

  it("shows all projects when All filter is clicked", () => {
    render(<Portfolio />);

    const commercialBtn = screen.getAllByRole("button").find((b) => b.textContent === "Commercial");
    if (commercialBtn) fireEvent.click(commercialBtn);
    expect(screen.queryByText("Kyankwazi Country Home")).not.toBeInTheDocument();

    const allBtn = screen.getAllByRole("button").find((b) => b.textContent === "All");
    if (allBtn) fireEvent.click(allBtn);
    expect(screen.getAllByText("Kyankwazi Country Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("KMT Plaza Nansana").length).toBeGreaterThan(0);
  });

  it("displays project location and year", () => {
    render(<Portfolio />);
    expect(screen.getByText(/Nansana, Uganda · 2025/)).toBeInTheDocument();
  });

  it("renders category badges on project cards", () => {
    render(<Portfolio />);
    const commercialBadges = screen.getAllByText("Commercial");
    expect(commercialBadges.length).toBeGreaterThan(1);
  });

  it("renders project thumbnail images", () => {
    render(<Portfolio />);
    expect(screen.getByAltText("KMT Plaza Nansana — Day View")).toBeInTheDocument();
  });

  it("shows project detail when a project is clicked", () => {
    render(<Portfolio />);

    const projectCards = screen.getAllByText("KMT Plaza Nansana");
    const projectCard = projectCards[0].closest(".group");
    if (projectCard) {
      fireEvent.click(projectCard);
    }

    expect(screen.getByText(/multi-storey mixed-use commercial development/)).toBeInTheDocument();
    expect(screen.getByText(/Architectural Design, Interior Design, Project Management/)).toBeInTheDocument();
    expect(screen.getByText("KMT Plaza Nansana — Night View")).toBeInTheDocument();
  });
});
