import { describe, expect, it } from "vitest";
import { estimateCapacity } from "./capacity";

describe("estimateCapacity", () => {
  it("calculates base load for area with default people and normal exposure", () => {
    const result = estimateCapacity({
      areaM2: 40,
      personas: 2,
      exposicion: "normal",
      equiposCalor: 0,
    });
    // 40 * 600 = 24000
    expect(result.needBtu).toBe(24000);
    expect(result.commercialBtu).toBe(24000);
    expect(result.catalogHref).toBe("/equipos?btu_min=24000&btu_max=24000");
  });

  it("applies 15% sun factor", () => {
    const result = estimateCapacity({
      areaM2: 40,
      personas: 2,
      exposicion: "mucho_sol",
      equiposCalor: 0,
    });
    // 24000 * 1.15 = 27600 → round to 27500 → commercial 36000
    expect(result.needBtu).toBe(27500);
    expect(result.commercialBtu).toBe(36000);
  });

  it("adds BTU for extra people beyond two", () => {
    const result = estimateCapacity({
      areaM2: 25,
      personas: 4,
      exposicion: "normal",
      equiposCalor: 0,
    });
    // 25*600 + 2*600 = 15000 + 1200 = 16200 → 16000 → commercial 18000
    expect(result.needBtu).toBe(16000);
    expect(result.commercialBtu).toBe(18000);
  });

  it("adds BTU for heat equipment", () => {
    const result = estimateCapacity({
      areaM2: 15,
      personas: 2,
      exposicion: "normal",
      equiposCalor: 2,
    });
    // 15*600 + 2*1200 = 9000 + 2400 = 11400 → 11500 → commercial 12000
    expect(result.needBtu).toBe(11500);
    expect(result.commercialBtu).toBe(12000);
  });

  it("returns null commercial capacity above 54000", () => {
    const result = estimateCapacity({
      areaM2: 100,
      personas: 8,
      exposicion: "mucho_sol",
      equiposCalor: 3,
    });
    // 100*600 + 6*600 + 3*1200 = 60000 + 3600 + 3600 = 67200 * 1.15 = 77280 → 77500
    expect(result.needBtu).toBe(77500);
    expect(result.commercialBtu).toBeNull();
    expect(result.catalogHref).toBeNull();
    expect(result.whatsappHref).toContain("estudio%20t%C3%A9cnico");
  });

  it("rounds to nearest 500", () => {
    const result = estimateCapacity({
      areaM2: 15,
      personas: 3,
      exposicion: "normal",
      equiposCalor: 0,
    });
    // 9000 + 600 = 9600 → 9500 → commercial 12000
    expect(result.needBtu).toBe(9500);
    expect(result.commercialBtu).toBe(12000);
  });
});
