from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_criar_demanda():
    # Coloque código para testar criação de demanda autenticado como cidadão
    # Verifique status 201 e os campos retornados
    pass


def test_listar_demandas_com_filtro():
    # Coloque código para testar GET /demands?status=Aberta e verificar que só retorna demandas abertas
    pass


def test_atualizar_status_como_gestor():
    # Coloque código para testar PATCH /demands/{id} autenticado como gestor
    # Verifique que o status é alterado corretamente
    pass


def test_atualizar_status_como_cidadao_proibido():
    # Coloque código para testar PATCH /demands/{id} autenticado como cidadão
    # Verifique que retorna 403
    pass


def test_deletar_demanda():
    # Coloque código para testar DELETE /demands/{id} e verificar status 204
    pass
