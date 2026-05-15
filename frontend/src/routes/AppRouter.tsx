import { Route, Routes, Navigate } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { CategoriasPage } from "../pages/CategoriasPage";
import { IngredientesPage } from "../pages/IngredientesPage";
import { ProductosPage } from "../pages/ProductosPage";
import { ProductoDetallePage } from "../pages/ProductoDetallePage";

export const AppRouter = () => {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos/detalle/:id" element={<ProductoDetallePage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />
        </Routes>
      </main>
    </>
  );
};
