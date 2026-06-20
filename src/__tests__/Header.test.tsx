import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Header", () => {
  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText(/ZOE DESIGN FORGE/)).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Header />);
    expect(screen.getAllByText("Home")).toHaveLength(2); // desktop + mobile
    expect(screen.getAllByText("About")).toHaveLength(2);
    expect(screen.getAllByText("Services")).toHaveLength(2);
    expect(screen.getAllByText("Portfolio")).toHaveLength(2);
    expect(screen.getAllByText("Team")).toHaveLength(2);
    expect(screen.getAllByText("Blog")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  it("renders the Start a Project button", () => {
    render(<Header />);
    expect(screen.getByText("Start a Project")).toBeInTheDocument();
  });

  it("has a mobile toggle button", () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    expect(toggleButton).toBeInTheDocument();
  });

  it("toggles mobile navigation on button click", () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggleButton);
    // After click, mobile nav should be visible (opacity-100)
    const mobileNav = toggleButton.closest("header")?.querySelector(".lg\\:hidden.fixed");
    expect(mobileNav).toHaveClass("opacity-100");
  });

  it("closes mobile nav when a link is clicked", () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggleButton);

    // Click a mobile nav link
    const mobileLinks = screen.getAllByText("About");
    const mobileLink = mobileLinks.find((el) => el.closest(".lg\\:hidden.fixed"));
    if (mobileLink) {
      fireEvent.click(mobileLink);
    }

    const mobileNav = toggleButton.closest("header")?.querySelector(".lg\\:hidden.fixed");
    expect(mobileNav).toHaveClass("opacity-0");
  });

  it("renders the logo image", () => {
    render(<Header />);
    const logo = screen.getByAltText("Zoe Designs Icon");
    expect(logo).toBeInTheDocument();
  });
});
