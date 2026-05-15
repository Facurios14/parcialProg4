import type { ICategoria } from "../../../types";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

type Props = {
  categoriaActive: ICategoria | null;
  categorias: ICategoria[];
  handleCloseModal: VoidFunction;
  handleCreate?: (categoria: Omit<ICategoria, "id">) => void | Promise<void>;
  handleUpdate?: (id: number, categoria: Omit<ICategoria, "id">) => void | Promise<void>;
};

export const ModalCategorias = ({
  categoriaActive,
  categorias,
  handleCloseModal,
  handleCreate,
  handleUpdate,
}: Props) => {
  const [nuevaImagenUrl, setNuevaImagenUrl] = useState("");
  const [parentSearchTerm, setParentSearchTerm] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      nombre: categoriaActive?.nombre ?? "",
      descripcion: categoriaActive?.descripcion ?? "",
      imagen_url: categoriaActive?.imagen_url ?? "",
      parent_id: categoriaActive?.parent_id?.toString() ?? "",
    },
    onSubmit: async ({ value }) => {
      setApiError(null);
      const categoriaData: Omit<ICategoria, "id"> = {
        nombre: value.nombre,
        descripcion: value.descripcion || undefined,
        imagen_url: value.imagen_url || undefined,
        parent_id: value.parent_id ? Number(value.parent_id) : undefined,
      };
      try {
        if (categoriaActive) {
          if (handleUpdate) await handleUpdate(categoriaActive.id!, categoriaData);
        } else {
          if (handleCreate) await handleCreate(categoriaData);
        }
        handleCloseModal();
      } catch (err: any) {
        setApiError(err.message || "Error al guardar");
      }
    },
  });

  const categoriasOptions = categorias
    .filter((cat) => cat.id !== categoriaActive?.id)
    .map((categoria) => {
      let path = categoria.nombre;
      let current = categoria;
      const visited = new Set<number>();
      if (current.id) visited.add(current.id);

      while (current.parent_id) {
        const parent = categorias.find((c) => c.id === current.parent_id);
        if (parent && parent.id && !visited.has(parent.id)) {
          visited.add(parent.id);
          path = `${parent.nombre} > ${path}`;
          current = parent;
        } else {
          break;
        }
      }
      return { ...categoria, path };
    })
    .filter((cat) => 
      cat.path.toLowerCase().includes(parentSearchTerm.toLowerCase())
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {categoriaActive ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <button
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={handleCloseModal}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          id="categoria-form"
        >
          <div className="px-6 py-5 space-y-5">
            {/* Nombre */}
            <form.Field
              name="nombre"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Nombre</label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nombre de la categoría"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            />

            {/* Imagen URL */}
            <form.Field
              name="imagen_url"
              children={(field) => {
                const imagenUrl = field.state.value;
                const agregarImagen = () => {
                  const url = nuevaImagenUrl.trim();
                  if (url) {
                    field.handleChange(url);
                    setNuevaImagenUrl("");
                  }
                };
                const eliminarImagen = () => field.handleChange("");

                return (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-600">Imagen (URL)</label>
                    {imagenUrl && (
                      <div className="relative w-20 h-20 group">
                        <img
                          src={imagenUrl}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=?";
                          }}
                        />
                        <button
                          type="button"
                          onClick={eliminarImagen}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {!imagenUrl && (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={nuevaImagenUrl}
                            onChange={(e) => setNuevaImagenUrl(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                agregarImagen();
                              }
                            }}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button
                            type="button"
                            onClick={agregarImagen}
                            className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        {nuevaImagenUrl && (
                          <div className="flex justify-center p-1.5 border border-dashed border-emerald-200 rounded-lg bg-emerald-50/20">
                            <img
                              src={nuevaImagenUrl}
                              alt="Escribiendo..."
                              className="max-h-20 rounded-md opacity-70 object-cover"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }}
            />

            {/* Categoría Padre */}
            <form.Field
              name="parent_id"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Categoría Padre</label>
                  <input
                    type="text"
                    placeholder="Buscar categoría padre..."
                    value={parentSearchTerm}
                    onChange={(e) => setParentSearchTerm(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-1"
                  />
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    size={categoriasOptions.length > 0 ? Math.min(4, categoriasOptions.length + 1) : 1}
                  >
                    <option value="">Ninguna</option>
                    {categoriasOptions.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.path}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />

            {/* Descripción */}
            <form.Field
              name="descripcion"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <textarea
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                    placeholder="Breve descripción de la categoría"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col border-t border-gray-100 bg-gray-50">
          {apiError && (
            <div className="px-6 py-3 bg-red-50 border-b border-red-100 text-sm text-red-600 font-medium">
              Error: {apiError}
            </div>
          )}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <button
                type="submit"
                form="categoria-form"
                disabled={!canSubmit || isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {categoriaActive ? "Guardar cambios" : "Crear categoría"}
              </button>
            )}
          </form.Subscribe>
        </div>
        </div>
      </div>
    </div>
  );
};

