from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories import demand_repository
from app.schemas.demand import DemandCreate, DemandResponse, DemandUpdate


def list_demands(db: Session, status, category, region, priority) -> list[DemandResponse]:
    # Coloque código para chamar demand_repository.get_all com os filtros e retornar a lista
    pass


def get_demand(db: Session, demand_id: str) -> DemandResponse:
    demand = demand_repository.get_by_id(db, demand_id)
    if not demand:
        raise HTTPException(status_code=404, detail="Demanda não encontrada")
    return DemandResponse.model_validate(demand)


def create_demand(db: Session, data: DemandCreate, current_user: User) -> DemandResponse:
    # Coloque código para chamar demand_repository.create passando db, data e current_user.id
    pass


def update_demand(db: Session, demand_id: str, data: DemandUpdate, current_user: User) -> DemandResponse:
    demand = demand_repository.get_by_id(db, demand_id)
    if not demand:
        raise HTTPException(status_code=404, detail="Demanda não encontrada")
    # Coloque código para verificar se current_user.role == "gestor", senão lançar HTTPException 403
    return DemandResponse.model_validate(demand_repository.update(db, demand, data))


def delete_demand(db: Session, demand_id: str, current_user: User) -> None:
    demand = demand_repository.get_by_id(db, demand_id)
    if not demand:
        raise HTTPException(status_code=404, detail="Demanda não encontrada")
    # Coloque código para permitir deleção só se gestor ou dono da demanda, senão HTTPException 403
    demand_repository.delete(db, demand)
