import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EquipmentCard } from "./EquipmentCard";

describe("EquipmentCard", () => {
  it("shows brand, specs and CTA", () => {
    render(
      <EquipmentCard
        brand="Confortfresh"
        name="Minisplit Inverter"
        btu="24.000"
        model="INMS"
        href="https://wa.me/573104745946"
      />,
    );
    expect(screen.getByText("Confortfresh")).toBeInTheDocument();
    expect(screen.getByText("Minisplit Inverter")).toBeInTheDocument();
    expect(screen.getByText(/24\.000 BTU · Ref\. INMS/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cotizar este equipo" }),
    ).toHaveAttribute("href", "https://wa.me/573104745946");
  });
});
