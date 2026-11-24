import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PillarItem } from "./PillarItem";

describe("PillarItem", () => {
  it("renders title and description", () => {
    render(
      <PillarItem
        icon="gear"
        title="Mantenimiento"
        description="Preventivo y correctivo."
      />,
    );
    expect(screen.getByText("Mantenimiento")).toBeInTheDocument();
    expect(screen.getByText("Preventivo y correctivo.")).toBeInTheDocument();
  });
});
