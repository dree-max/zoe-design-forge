import { render, screen } from "@testing-library/react";
import Team from "@/components/Team";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
}));

describe("Team", () => {
  it("renders the section heading", () => {
    render(<Team />);
    expect(screen.getByText("Our Team")).toBeInTheDocument();
    expect(screen.getByText("The People Behind the Work")).toBeInTheDocument();
  });

  it("renders all team members", () => {
    render(<Team />);
    expect(screen.getByText("Eng. John Muwonge")).toBeInTheDocument();
    expect(screen.getByText("Sarah Nantongo")).toBeInTheDocument();
    expect(screen.getByText("David Okello")).toBeInTheDocument();
  });

  it("renders team member roles", () => {
    render(<Team />);
    expect(screen.getByText("Principal Engineer & Managing Director")).toBeInTheDocument();
    expect(screen.getByText("Lead Architect")).toBeInTheDocument();
    expect(screen.getByText("Interior Design Director")).toBeInTheDocument();
  });

  it("renders team member bios", () => {
    render(<Team />);
    expect(screen.getByText(/Over 15 years of experience/)).toBeInTheDocument();
    expect(screen.getByText(/Award-winning architect/)).toBeInTheDocument();
    expect(screen.getByText(/transforms spaces into stunning/)).toBeInTheDocument();
  });

  it("renders qualifications for each member", () => {
    render(<Team />);
    expect(screen.getByText("BSc. Civil Engineering (Mak)")).toBeInTheDocument();
    expect(screen.getByText("BArch (Mak)")).toBeInTheDocument();
    expect(screen.getByText("NCIDQ Certified")).toBeInTheDocument();
  });

  it("renders initials avatar for each member", () => {
    render(<Team />);
    expect(screen.getByText("EJM")).toBeInTheDocument(); // Eng. John Muwonge
    expect(screen.getByText("SN")).toBeInTheDocument();  // Sarah Nantongo
    expect(screen.getByText("DO")).toBeInTheDocument();  // David Okello
  });
});
