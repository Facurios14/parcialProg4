import type { IIngrediente } from "../types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/ingredientes`;

export const getIngredientes = async (): Promise<IIngrediente[]> => {
  try {
    const response = await fetch(BASE_URL);
    const data: IIngrediente[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getIngrediente = async (id: number): Promise<IIngrediente> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data: IIngrediente = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createIngrediente = async (
  newIngrediente: Omit<IIngrediente, "id">
): Promise<IIngrediente> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newIngrediente),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al crear";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const updateIngrediente = async (
  id: number,
  ingrediente: Omit<IIngrediente, "id">
): Promise<IIngrediente> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingrediente),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.detail?.[0]?.msg || errorData.detail || "Error al actualizar";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return response.json();
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
