import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectorCard } from "./SectorCard";

describe("SectorCard", () => {
  it("renders a linked sector label", () => {
    render(
      <SectorCard icon="home" label="Residencial" href="/servicios" />,
    );
    expect(
      screen.getByRole("link", { name: /Residencial/i }),
    ).toHaveAttribute("href", "/servicios");
  });
});
