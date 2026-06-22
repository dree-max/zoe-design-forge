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

  it("renders all navigation items with route links", () => {
    render(<Header />);
    expect(screen.getAllByText("Home")).toHaveLength(2); // desktop + mobile
    expect(screen.getAllByText("About")).toHaveLength(2);
    expect(screen.getAllByText("Services")).toHaveLength(2);
    expect(screen.getAllByText("Portfolio")).toHaveLength(2);
    expect(screen.getAllByText("Blog")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  it("uses real route hrefs instead of hash anchors", () => {
    render(<Header />);
    const desktopNav = screen.getAllByText("Home")[0].closest("a");
    expect(desktopNav).toHaveAttribute("href", "/");

    const aboutLink = screen.getAllByText("About")[0].closest("a");
    expect(aboutLink).toHaveAttribute("href", "/about");

    const servicesLink = screen.getAllByText("Services")[0].closest("a");
    expect(servicesLink).toHaveAttribute("href", "/services");

    const portfolioLink = screen.getAllByText("Portfolio")[0].closest("a");
    expect(portfolioLink).toHaveAttribute("href", "/projects");

    const blogLink = screen.getAllByText("Blog")[0].closest("a");
    expect(blogLink).toHaveAttribute("href", "/blog");

    const contactLink = screen.getAllByText("Contact")[0].closest("a");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders the Start a Project button linking to /contact", () => {
    render(<Header />);
    const btn = screen.getByText("Start a Project");
    expect(btn).toBeInTheDocument();
    expect(btn.closest("a")).toHaveAttribute("href", "/contact");
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
    const mobileNav = toggleButton.closest("header")?.querySelector(".lg\\:hidden.fixed");
    expect(mobileNav).toHaveClass("opacity-100");
  });

  it("closes mobile nav when a link is clicked", () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggleButton);

    const mobileLinks = screen.getAllByText("About");
    const mobileLink = mobileLinks.find((el) => el.closest(".lg\\:hidden.fixed"));
    if (mobileLink) {
      fireEvent.click(mobileLink);
    }

    const mobileNav = toggleButton.closest("header")?.querySelector(".lg\\:hidden.fixed");
    expect(mobileNav).toHaveClass("opacity-0");
  });

  it("renders the logo image linking to home", () => {
    render(<Header />);
    const logo = screen.getByAltText("Zoe Designs Icon");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });
});
