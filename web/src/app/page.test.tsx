import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return {
    ...actual,
    listDestacados: vi.fn(),
  };
});

import { listDestacados } from "@/lib/api";

const mockListDestacados = vi.mocked(listDestacados);

describe("Home", () => {
  beforeEach(() => {
    mockListDestacados.mockResolvedValue([
      {
        id: 1,
        nombre: "Minisplit Inverter",
        slug: "confortfresh-minisplit-inverter-24000",
        marca: { id: 1, nombre: "Confortfresh", slug: "confortfresh" },
        categoria: {
          id: 1,
          nombre: "Mini Split Pared",
          slug: "mini-split-pared",
        },
        capacidad_btu: 24000,
        tipo: "Mini Split Pared",
        tecnologia: "Inverter",
        referencia: "INMS",
        descripcion: "[Descripción pendiente]",
        imagenes: [],
        destacado: true,
      },
    ]);
  });

  it("renders the hero headline and main sections", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", {
        name: /Climatizamos tus espacios/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Equipos destacados/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /\[Calculadora de capacidad · provisional · regla BTU por validar con el equipo técnico\]/,
      ),
    ).toBeInTheDocument();
  });
});
