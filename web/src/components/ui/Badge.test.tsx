import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders accent and ok tones", () => {
    const { rerender } = render(<Badge>Nuevo</Badge>);
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    rerender(<Badge tone="ok">Revisado</Badge>);
    expect(screen.getByText("Revisado")).toBeInTheDocument();
  });
});
