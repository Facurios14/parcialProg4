import type { ICategoria } from "../types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/categorias`;

export const getCategorias = async (): Promise<ICategoria[]> => {
  try {
    const response = await fetch(BASE_URL);
    const data: ICategoria[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategoria = async (id: number): Promise<ICategoria> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data: ICategoria = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCategoria = async (
  newCategoria: Omit<ICategoria, "id">
): Promise<ICategoria> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategoria),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al crear";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const updateCategoria = async (
  id: number,
  categoria: Omit<ICategoria, "id">
): Promise<ICategoria> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al actualizar";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const deleteCategoria = async (id: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
