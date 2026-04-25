# Lista de Verificación del Proyecto Integrador

## Backend (FastAPI + SQLModel)

- [x] **Entorno:** Uso de `.venv`, `requirements.txt` y FastAPI funcionando en modo dev.
- [x] **Modelado:** Tablas creadas con SQLModel incluyendo relaciones `Relationship` (1:N y N:N).
  - `Categoria` ↔ `ProductoCategoria` ↔ `Producto` (N:N con `link_model` + `back_populates`)
  - `Ingrediente` ↔ `ProductoIngrediente` ↔ `Producto` (N:N con atributos `es_removible`, `es_opcional`)
  - `Categoria` → `Categoria` (self-referencial 1:N para subcategorías via `parent_id`)
- [x] **Validación:** Uso de `Annotated`, `Query` y `Path` en todos los routers.
- [x] **CRUD Persistente:** Endpoints funcionales para Crear, Leer, Actualizar y Borrar en PostgreSQL.
- [x] **Seguridad de Datos:** `response_model` declarado en cada endpoint — el modelo de tabla nunca se expone directamente.
- [x] **Estructura:** Código organizado por módulos (`categorias/`, `ingredientes/`, `productos/`) cada uno con `models`, `schemas`, `repository`, `unit_of_work`, `service` y `router`.

## Frontend (React + TypeScript + Tailwind)

- [x] **Setup:** Proyecto creado con Vite + TypeScript, estructura de carpetas limpia.
- [x] **Componentes:** Componentes funcionales con Props tipadas con interfaces TypeScript.
  - `Button`, `Badge`, `Input`, `Textarea`, `Select`, `Checkbox`, `Modal`, `Spinner`, `EmptyState`
- [x] **Estilos:** Interfaz construida con Tailwind CSS 4 (utility-first).
- [x] **Navegación:** React Router DOM v7 con rutas estáticas y una ruta dinámica (`/productos/:productoId`).
- [x] **Estado Local:** `useState` en todos los formularios de alta/edición y para controlar modales.

## Integración y Server State

- [x] **Lectura (useQuery):** Listados de categorías, ingredientes y productos; detalle de producto con sus relaciones.
- [x] **Escritura (useMutation):** Formularios de alta y edición en los tres módulos.
- [x] **Sincronización:** `invalidateQueries` tras cada mutación exitosa para refrescar la UI automáticamente.
- [x] **Feedback:** Estados `isLoading` → spinner, `isError` → mensaje de error en cada página y modal.

## Video de Presentación

- [ ] **Duración:** El video dura 15 minutos o menos.
- [ ] **Audio/Video:** La voz es clara y la resolución de pantalla permite leer el código.
- [ ] **Demo:** Se muestra el flujo completo desde la creación hasta la persistencia en la DB.
