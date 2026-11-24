import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProcessStep } from "./ProcessStep";

describe("ProcessStep", () => {
  it("renders the step label", () => {
    render(<ProcessStep icon="clip" label="Cotiza" />);
    expect(screen.getByText("Cotiza")).toBeInTheDocument();
  });
});
