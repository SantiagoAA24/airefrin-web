import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders the label", () => {
    render(<Eyebrow>Sectores</Eyebrow>);
    expect(screen.getByText("Sectores")).toBeInTheDocument();
  });
});
