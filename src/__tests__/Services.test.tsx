import { render, screen } from "@testing-library/react";
import Services from "@/components/Services";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, layout, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
}));

describe("Services", () => {
  it("renders the Services section header", () => {
    render(<Services />);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("What We Do")).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    render(<Services />);
    expect(screen.getByText("Architectural Design")).toBeInTheDocument();
    expect(screen.getByText("Interior Design")).toBeInTheDocument();
    expect(screen.getByText("Master Planning")).toBeInTheDocument();
    expect(screen.getByText("Landscape Design")).toBeInTheDocument();
    expect(screen.getByText("Custom Furniture")).toBeInTheDocument();
    expect(screen.getByText("Project Management")).toBeInTheDocument();
  });

  it("renders process steps for each service (first 3)", () => {
    render(<Services />);
    expect(screen.getByText("Client consultation & site analysis")).toBeInTheDocument();
    expect(screen.getByText("Space planning & mood board creation")).toBeInTheDocument();
  });
});
