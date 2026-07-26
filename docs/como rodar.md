# rodar o docker para o desenvolvimento

docker compose --profile dev up --build

# rodar o docker na produção

docker compose --profile prod up --build

# Encerra e remove os containers, redes e recursos criados.

docker compose down

# Encerra e remove os containers, redes e também os volumes.
# Cuidado: isso apagará os dados persistidos (como o banco PostgreSQL).

docker compose down -v
