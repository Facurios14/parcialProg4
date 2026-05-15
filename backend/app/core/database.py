from sqlmodel import create_engine, SQLModel, Session
from .config import settings

engine = create_engine(settings.DATABASE_URL, echo=False)


def create_db_and_tables() -> None:
    """Crea todas las tablas en la base de datos si no existen."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependency de FastAPI: provee una sesión de DB por request."""
    with Session(engine) as session:
        yield session
