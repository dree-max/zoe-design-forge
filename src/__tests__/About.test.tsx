import { render, screen } from "@testing-library/react";
import About from "@/components/About";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, layout, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
}));

describe("About", () => {
  it("renders the About Us section", () => {
    render(<About />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText(/Architects of Vision/)).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<About />);
    expect(screen.getByText(/We don't just design buildings/)).toBeInTheDocument();
  });

  it("renders statistics", () => {
    render(<About />);
    expect(screen.getByText("15+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText("Projects Completed")).toBeInTheDocument();
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("renders the about image", () => {
    render(<About />);
    const img = screen.getByAltText("ZOE DESIGN FORGE studio");
    expect(img).toBeInTheDocument();
  });
});
