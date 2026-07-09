# 📚 Biblioteca Virtual

Sistema de gerenciamento de biblioteca desenvolvido com **Spring Boot**, **React** e **PostgreSQL**, utilizando **Docker** para facilitar a configuração do ambiente de desenvolvimento.

O projeto tem como objetivo disponibilizar uma plataforma para gerenciamento de livros, usuários, empréstimos e futuras funcionalidades como avaliações e integração com inteligência artificial.

---

## 🚀 Tecnologias utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- PostgreSQL
- Maven
- Hibernate

### Frontend
- React
- Vite
- JavaScript/TypeScript

### Infraestrutura
- Docker
- Docker Compose

---

# 🐳 Executando com Docker

## Pré-requisitos

Certifique-se de possuir instalado:

- Docker
- Docker Compose

Verifique:

```bash
docker --version
docker compose version
```

---

# ⚙️ Configuração das variáveis de ambiente

Antes de iniciar o projeto, crie o arquivo `.env` dentro da pasta `backend`:

```bash
cd backend

cp .env.example .env
```

Depois configure os valores das variáveis:

```env
POSTGRES_DB=biblioteca
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha

SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/biblioteca
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua_senha

OPENAI_API_KEY=sua_chave_openai

JWT_SECRET=sua_chave_jwt
```

⚠️ Nunca compartilhe ou versione o arquivo `.env`, pois ele contém informações sensíveis.

---

# ▶️ Ambiente de desenvolvimento

Para iniciar todos os serviços:

```bash
docker compose --profile dev up --build
```

Serviços disponíveis:

| Serviço | Porta |
|---|---|
| Backend | http://localhost:8080 |
| Frontend | http://localhost:5173 |
| PostgreSQL | localhost:5432 |

---

# 🛑 Parando os containers

```bash
docker compose down
```

Para remover também os volumes:

```bash
docker compose down -v
```

⚠️ O comando acima remove os dados persistidos do PostgreSQL.

---

# 🏗️ Ambiente de produção

Executar:

```bash
docker compose --profile prod up --build
```

No ambiente de produção:

- O backend não expõe portas diretamente.
- O frontend é servido por um servidor web.
- Os dados do PostgreSQL continuam persistidos através de volumes.

---

# 🗄️ Banco de dados

O projeto utiliza PostgreSQL.

Configuração:

```
Banco: biblioteca
Usuário: postgres
Porta: 5432
```

O armazenamento é persistido através do volume Docker:

```
postgres_data
```

---

# 🔐 Segurança

O projeto possui configuração inicial utilizando:

- Spring Security
- JWT para autenticação
- Variáveis sensíveis através de arquivos `.env`

Nunca versione arquivos contendo:

```
.env
```

Adicione ao `.gitignore`:

```
.env
```

---

# 🧪 Testes

Executar testes do backend:

```bash
cd backend

./mvnw test
```

ou:

```bash
mvn test
```

---

# 📌 Funcionalidades

## Implementadas

- [x] Configuração Spring Boot
- [x] Banco PostgreSQL
- [x] Ambiente Docker
- [x] Docker Compose com ambientes dev/prod

## Futuras

- [ ] Cadastro de usuários
- [ ] Cadastro de livros
- [ ] Sistema de empréstimos
- [ ] Sistema de avaliações
- [ ] Dashboard administrativo
- [ ] Integração com IA
- [ ] Busca inteligente de livros

---

# 🤝 Contribuição

1. Faça um fork do projeto

2. Crie uma branch:

```bash
git checkout -b minha-feature
```

3. Faça suas alterações:

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

4. Envie:

```bash
git push origin minha-feature
```

---

# 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por **Valci** e **Pedro**