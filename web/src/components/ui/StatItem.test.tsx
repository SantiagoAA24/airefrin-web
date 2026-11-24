import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatItem } from "./StatItem";

describe("StatItem", () => {
  it("renders value and label", () => {
    render(<StatItem icon="cal" value="2012" label="Año de fundación" />);
    expect(screen.getByText("2012")).toBeInTheDocument();
    expect(screen.getByText("Año de fundación")).toBeInTheDocument();
  });
});
