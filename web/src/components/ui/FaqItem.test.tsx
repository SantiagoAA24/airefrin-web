import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaqItem } from "./FaqItem";

describe("FaqItem", () => {
  it("toggles content and aria-expanded", () => {
    render(
      <FaqItem question="¿En qué zonas atienden?">
        En Bogotá, Cundinamarca y Meta.
      </FaqItem>,
    );
    const trigger = screen.getByRole("button", {
      name: "¿En qué zonas atienden?",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("En Bogotá, Cundinamarca y Meta."),
    ).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("En Bogotá, Cundinamarca y Meta."),
    ).toBeInTheDocument();
  });
});
