import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

jest.mock("framer-motion", () => ({
  motion: {
    img: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <img {...rest as React.ImgHTMLAttributes<HTMLImageElement>}>{children}</img>;
    },
    h2: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <h2 {...rest as React.HTMLAttributes<HTMLHeadingElement>}>{children}</h2>;
    },
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <p {...rest as React.HTMLAttributes<HTMLParagraphElement>}>{children}</p>;
    },
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
}));

describe("Hero", () => {
  it("renders the brand logo", () => {
    render(<Hero />);
    const logo = screen.getByAltText("Zoe Designs Forge");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/WhiteLogo.png");
  });

  it("renders the slogan", () => {
    render(<Hero />);
    expect(screen.getByText(/Design/)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Hero />);
    expect(screen.getByText(/Crafting exceptional spaces/)).toBeInTheDocument();
  });

  it("renders View Our Work button linking to /projects", () => {
    render(<Hero />);
    const viewBtn = screen.getByText("View Our Work");
    expect(viewBtn).toBeInTheDocument();
    expect(viewBtn.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("renders Start a Project button linking to /contact", () => {
    render(<Hero />);
    const startBtn = screen.getByText("Start a Project");
    expect(startBtn).toBeInTheDocument();
    expect(startBtn.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders WhatsApp floating button", () => {
    render(<Hero />);
    const whatsappBtn = screen.getByLabelText("Chat on WhatsApp");
    expect(whatsappBtn).toBeInTheDocument();
    expect(whatsappBtn).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });
});
