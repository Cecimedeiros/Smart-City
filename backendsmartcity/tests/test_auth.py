from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_cidadao():
    # Coloque código para testar o registro de um cidadão via POST /auth/register
    # Verifique que retorna status 201 e um access_token no body
    pass


def test_register_gestor_sem_codigo():
    # Coloque código para testar que registrar um gestor sem codigo_acesso retorna erro 400
    pass


def test_login_sucesso():
    # Coloque código para testar login com email e senha corretos
    # Verifique que retorna status 200 e access_token
    pass


def test_login_senha_errada():
    # Coloque código para testar login com senha incorreta e verificar retorno 401
    pass
