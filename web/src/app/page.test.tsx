import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the hero headline and main sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Climatizamos tus espacios/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Equipos destacados/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /\[Calculadora de capacidad · provisional · regla BTU por validar con el equipo técnico\]/,
      ),
    ).toBeInTheDocument();
  });
});
