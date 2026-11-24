import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("associates a visually hidden label with the input", () => {
    render(<Field id="nombre" placeholder="Nombre" />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  });

  it("renders a select with options", () => {
    render(
      <Field
        id="necesitas"
        placeholder="¿Qué necesitas?"
        options={["Mantenimiento", "Reparación"]}
      />,
    );
    expect(screen.getByLabelText("¿Qué necesitas?")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mantenimiento" })).toBeInTheDocument();
  });
});
