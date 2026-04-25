from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List
from decimal import Decimal
from datetime import datetime

from app.modules.categorias.schemas import CategoriaResponse
from app.modules.ingredientes.schemas import IngredienteResponse


class IngredienteLink(BaseModel):
    """Schema para enviar un ingrediente al crear/actualizar un producto."""
    ingrediente_id: int
    es_removible: bool = True
    es_opcional: bool = False


class ProductoBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=150)
    descripcion: Optional[str] = Field(default=None, max_length=500)
    precio_base: Decimal = Field(..., gt=0, decimal_places=2)
    tiempo_prep_min: Optional[int] = Field(default=None, ge=1, le=180)
    disponible: bool = True


class ProductoCreate(ProductoBase):
    categoria_ids: List[int] = Field(
        ..., min_length=1, description="Debe tener al menos una categoría"
    )
    ingredientes: List[IngredienteLink] = []


class ProductoUpdate(BaseModel):
    nombre: Optional[str] = Field(default=None, min_length=2, max_length=150)
    descripcion: Optional[str] = Field(default=None, max_length=500)
    precio_base: Optional[Decimal] = Field(default=None, gt=0, decimal_places=2)
    tiempo_prep_min: Optional[int] = Field(default=None, ge=1, le=180)
    disponible: Optional[bool] = None
    categoria_ids: Optional[List[int]] = Field(default=None, min_length=1)
    ingredientes: Optional[List[IngredienteLink]] = None


class ProductoResponse(ProductoBase):
    id: int
    created_at: datetime
    updated_at: datetime
    categorias: List[CategoriaResponse] = []
    ingredientes: List[IngredienteResponse] = []

    model_config = ConfigDict(from_attributes=True)
