import type { IProducto } from "../types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/productos`;

export const getProductos = async (): Promise<IProducto[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }
    const data: IProducto[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProducto = async (id: number): Promise<IProducto> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data: IProducto = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProducto = async (
  newProducto: Omit<IProducto, "id">
): Promise<IProducto> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProducto),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al crear";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const updateProducto = async (
  id: number,
  producto: Omit<IProducto, "id">
): Promise<IProducto> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al actualizar";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const deleteProducto = async (id: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
