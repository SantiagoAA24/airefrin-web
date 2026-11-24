import { apiFetch } from "./client";
import type { components, operations } from "./schema";

export type Marca = components["schemas"]["MarcaOut"];
export type Categoria = components["schemas"]["CategoriaOut"];
export type EquipoListItem = components["schemas"]["EquipoListItem"];
export type EquipoDetalle = components["schemas"]["EquipoDetalle"];
export type EquipoListResponse = components["schemas"]["EquipoListResponse"];

export type ListEquiposParams = NonNullable<
  operations["list_equipos_catalogo_equipos_get"]["parameters"]["query"]
>;

export async function listEquipos(
  params: ListEquiposParams = {},
): Promise<EquipoListResponse> {
  return apiFetch<EquipoListResponse>("/catalogo/equipos", {
    searchParams: params,
    next: { revalidate: 60 },
  });
}

export async function getEquipoBySlug(slug: string): Promise<EquipoDetalle> {
  return apiFetch<EquipoDetalle>(
    `/catalogo/equipos/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } },
  );
}

export async function listMarcas(): Promise<Marca[]> {
  return apiFetch<Marca[]>("/catalogo/marcas", {
    next: { revalidate: 60 },
  });
}

export async function listDestacados(): Promise<EquipoListItem[]> {
  const response = await listEquipos({
    destacado: true,
    page: 1,
    page_size: 12,
  });
  return response.items;
}
