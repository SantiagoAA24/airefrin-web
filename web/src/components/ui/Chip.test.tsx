import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("exposes aria-pressed and handles clicks", () => {
    const onClick = vi.fn();
    render(
      <Chip pressed onClick={onClick}>
        40
      </Chip>,
    );
    const chip = screen.getByRole("button", { name: "40" });
    expect(chip).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
