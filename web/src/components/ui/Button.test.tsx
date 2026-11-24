import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders primary label and arrow", () => {
    render(
      <Button variant="primary" arrow>
        Solicitar cotización
      </Button>,
    );
    expect(
      screen.getByRole("button", { name: /Solicitar cotización/i }),
    ).toBeInTheDocument();
  });

  it("renders as a link when href is set", () => {
    render(
      <Button href="https://wa.me/573104745946" variant="whatsapp" icon="whatsapp">
        Escribir por WhatsApp
      </Button>,
    );
    expect(
      screen.getByRole("link", { name: /Escribir por WhatsApp/i }),
    ).toHaveAttribute("href", "https://wa.me/573104745946");
  });

  it("supports the disabled state", () => {
    render(<Button disabled>Deshabilitado</Button>);
    expect(screen.getByRole("button", { name: "Deshabilitado" })).toBeDisabled();
  });
});
