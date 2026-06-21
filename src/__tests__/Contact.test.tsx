import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "@/components/Contact";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      const { initial, animate, transition, whileInView, viewport, ...rest } = props as Record<string, unknown>;
      return <div {...rest as React.HTMLAttributes<HTMLDivElement>}>{children}</div>;
    },
  },
}));

describe("Contact", () => {
  it("renders the section heading", () => {
    render(<Contact />);
    expect(screen.getByText("Let's Build Something Extraordinary")).toBeInTheDocument();
  });

  it("renders contact info items", () => {
    render(<Contact />);
    expect(screen.getByText("Visit Our Studio")).toBeInTheDocument();
    expect(screen.getByText("Call Us")).toBeInTheDocument();
    expect(screen.getByText("Email Us")).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/)).toBeInTheDocument();
  });

  it("renders the enquiry form", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+256")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell us about your project...")).toBeInTheDocument();
  });

  it("renders project type select with options", () => {
    render(<Contact />);
    const selects = screen.getAllByRole("combobox");
    const projectTypeSelect = selects[0];
    expect(projectTypeSelect).toBeInTheDocument();
    expect(screen.getByText("Residential")).toBeInTheDocument();
    expect(screen.getByText("Commercial")).toBeInTheDocument();
    expect(screen.getByText("Hospitality")).toBeInTheDocument();
  });

  it("renders budget range select", () => {
    render(<Contact />);
    expect(screen.getByText("Under $10,000")).toBeInTheDocument();
    expect(screen.getByText("$500,000+")).toBeInTheDocument();
  });

  it("shows thank you message after form submission", () => {
    render(<Contact />);
    const submitButton = screen.getByText("Send Enquiry");
    
    const nameInput = screen.getByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("your@email.com");
    const messageInput = screen.getByPlaceholderText("Tell us about your project...");
    
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });
    
    // Select a project type
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "residential" } });

    fireEvent.click(submitButton);

    expect(screen.getByText("Thank You")).toBeInTheDocument();
    expect(screen.getByText(/Your enquiry has been received/)).toBeInTheDocument();
  });

  it("hides the form after submission", () => {
    render(<Contact />);
    const submitButton = screen.getByText("Send Enquiry");
    
    const nameInput = screen.getByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("your@email.com");
    const messageInput = screen.getByPlaceholderText("Tell us about your project...");
    
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });
    
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "residential" } });

    fireEvent.click(submitButton);

    expect(screen.queryByPlaceholderText("Your name")).not.toBeInTheDocument();
  });
});
