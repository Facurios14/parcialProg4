# Sistema de Pedidos — Parcial 1 · Programación IV · UTN

> 🎥 https://youtu.be/pSPrfLVmrOU

Aplicación fullstack para gestión de productos, categorías e ingredientes de un sistema de pedidos.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI + SQLModel + PostgreSQL |
| Frontend | React + TypeScript + Tailwind CSS 4 |
| Estado de servidor | TanStack Query v5 |
| Navegación | React Router DOM v7 |

---

## Estructura del proyecto

```
sistema_pedidos/
├── backend/
│   ├── app/
│   │   ├── core/               # Configuración, DB, repositorio base, UoW base
│   │   │   ├── config.py       # Settings con pydantic_settings + DATABASE_URL computed
│   │   │   ├── database.py     # Engine, get_session, create_db_and_tables
│   │   │   ├── repository.py   # BaseRepository genérico
│   │   │   └── unit_of_work.py # UnitOfWork base
│   │   └── modules/            # Código organizado por dominio
│   │       ├── categorias/
│   │       │   ├── models.py       # Categoria (SQLModel, table=True)
│   │       │   ├── schemas.py      # Create / Update / Response
│   │       │   ├── repository.py   # CategoriaRepository(BaseRepository)
│   │       │   ├── unit_of_work.py # CategoriaUnitOfWork
│   │       │   ├── service.py      # CategoriaService
│   │       │   └── router.py       # APIRouter con Annotated/Query
│   │       ├── ingredientes/       # Misma estructura
│   │       └── productos/
│   │           ├── models.py       # Producto + ProductoCategoria + ProductoIngrediente
│   │           └── ...
│   ├── main.py                 # FastAPI app, lifespan, CORS, routers
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    └── src/
        ├── api/                # Capa de acceso a la API (client + services)
        ├── components/         # UI reutilizable + modales por módulo + layout
        ├── pages/              # CategoriasPage, IngredientesPage, ProductosPage, ProductoDetallePage
        └── types/              # Interfaces TypeScript por módulo
```

---

## Cómo ejecutar

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# Iniciar servidor de desarrollo
uvicorn main:app --reload
```


API disponible en `http://localhost:8000`  
Swagger: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (con proxy a :8000)
npm run dev
```

Frontend disponible en `http://localhost:5173`

---

## Endpoints principales

### Categorías `/categorias`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar (filtro nombre, paginación) |
| GET | `/{id}` | Obtener por ID |
| POST | `/` | Crear |
| PUT | `/{id}` | Actualizar |
| DELETE | `/{id}` | Soft-delete |

### Ingredientes `/ingredientes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar (filtro nombre, alérgenos) |
| GET | `/{id}` | Obtener por ID |
| POST | `/` | Crear |
| PUT | `/{id}` | Actualizar |
| DELETE | `/{id}` | Soft-delete |

### Productos `/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar (filtros: nombre, disponible, precio) |
| GET | `/{id}` | Detalle con categorías e ingredientes |
| POST | `/` | Crear (con categorías e ingredientes) |
| PUT | `/{id}` | Actualizar (incluye re-vincular relaciones) |
| DELETE | `/{id}` | Soft-delete |
