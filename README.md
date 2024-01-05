# Brain-Agriculture

Projeto criado com [AdonisJS](https://adonisjs.com/).

Esta API oferece operações CRUD (Create, Read, Update, Delete) para gerenciar informações de produtores rurais e culturas associadas.

## Scripts Disponíveis

Em um diretório de sua preferência, execute para clonar o projeto:

`git clone https://github.com/manoelps/Brain-Agriculture.git`

Entre no diretório do projeto

`cd Brain-Agriculture`

**Instalando as dependências:**

Usando o gerenciador de pacotes YARN:

`yarn`

Ou usando o gerenciador de pacotes NPM:

`npm install`

**Inicialize o serviço do container docker para ter acesso ao banco de dados PostgreSQL**

`docker-compose up -d` (caso ocorra erro ao executar, vá para a sessão **_Resolvendo problemas_** ao final do arquivo, depois volte a esse ponto para continuar)

Execute as migrations

`node ace migration:run`

Inicialize a aplicação:

`node ace serve --watch`

# Rotas

### Produtores rurais

### 1- Listar todos os Produtores rurais

Método: `GET`

Endpoint: `/api/v1/farmers`

Descrição: Retorna uma lista de todos os produtores rurais cadastrados.

**Exemplo de Requisição:**

```javascript
GET http://localhost:3333/api/v1/farmers
```

### 2- Cadastrar um novo Produtor rural

Método: `POST`

Endpoint: `/api/v1/farmers`

Descrição: Cria um novo registro para um produtor rural com base nos dados fornecidos no corpo da requisição.

**Exemplo de Requisição:**

```javascript
POST http://localhost:3333/api/v1/farmers
```

```javascript
{
  "cpf_cnpj": "61.479.106/0001-04",
  "nome_produtor": "Manoel Pereira dos Santos",
  "nome_fazenda": "Fazenda Ouro Preto",
  "cidade": "Palmópolis",
  "estado": "MG",
  "area_total_hectares": 5,
  "area_agricultavel_hectares": 2,
  "area_vegetacao_hectares": 3,
  "culturas_plantadas": [
    {
      "cultura":"Soja"
    },
    {
      "cultura":"Milho"
    },
    {
      "cultura":"Algodão"
    }
  ]
}

```

### 3- Obter detalhes de um Produtor rural específico

Método: `GET`

Endpoint: `/api/v1/farmers/:id`

Descrição: Retorna informações detalhadas sobre um produtor rural específico, identificado pelo parâmetro `:id`.

**Exemplo de Requisição:**

```javascript
GET http://localhost:3333/api/v1/farmers/1
```

### 4- Atualizar dados de um Produtor rural

Método: `PATCH`

Endpoint: `/api/v1/farmers/:id`

Descrição: Atualiza as informações de um produtor rural específico com base nos dados fornecidos no corpo da requisição.

**Exemplo de Requisição:**

```javascript
PATCH http://localhost:3333/api/v1/farmers/1
```

```javascript
{
  "cpf_cnpj": "61.479.106/0001-04",
  "nome_produtor": "Manoel Pereira dos Santos",
  "nome_fazenda": "Fazenda Diamantina",
  "cidade": "Palmópolis",
  "estado": "MG",
  "area_total_hectares": 8,
  "area_agricultavel_hectares": 3,
  "area_vegetacao_hectares": 2,
  "culturas_plantadas": [
    {
    "cultura":"Algodão"
    },
    {
      "cultura":"Café"
    },
    {
      "cultura":"Cana de Açucar"
    }
  ]
}
```

### 5- Excluir um Produtor rural

Método: `DELETE`

Endpoint: `/api/v1/farmers/:id`

Descrição: Remove o registro de um produtor rural específico com base no parâmetro :id.

**Exemplo de Requisição:**

```javascript
DELETE http://localhost:3333/api/v1/farmers/1
```

### 6- Remover uma Cultura associada a um Produtor rural

Método: `DELETE`

Endpoint: `/api/v1/farmers/:id/crops`

Descrição: Remove uma cultura associada a um produtor rural específico com base no parâmetro `:id`.

**Exemplo de Requisição:**

```javascript
DELETE http://localhost:3333/api/v1/farmers/52/crops
```

## Culturas Plantadas

7- Listar todas as Culturas

Método: `GET`

Endpoint: `/api/v1/crops`

Descrição: Retorna uma lista de todas as culturas cadastradas (dados "mockados").

**Exemplo de Requisição:**

```javascript
GET http://localhost:3333/api/v1/crops
```

### Dashboard

8- Visualizar o Dashboard

Método: `GET`

Endpoint: `/api/v1/dashboard`

Descrição: Retorna dados consolidados e estatísticas sobre a atividade agrícola, proporcionando uma visão geral do sistema.

**Exemplo de Requisição:**

```javascript
GET http://localhost:3333/api/v1/dashboard
```

#

# Resolvendo problemas

**Caso ocorra erro ao executar o container do banco de dados postgreSQL, informando que a porta 5432 já se encontra em uso**

Execute o comando abaixo no terminal para listar todos os containers em execução:

```bash
docker ps
```

Execute o comando abaixo no terminal para parar o container específico que está fazendo uso da porta 5432, pelo seu CONTAINER ID ou NOME:

Pelo nome:

```bash
docker stop nome_do_seu_container
```

Ou pelo ID:

```bash
docker stop id_do_seu_container
```

**_Exemplo de parada de container pelo CONTAINER ID_**

```bash
docker stop 35a019c57972
```

**_Exemplo de parada de container pelo NOME_**

```bash
docker stop postgres-brain-agriculture
```

Após esse processo, execute novamente o comando **_docker ps_**, para confirmar se não há nenhum outro container utilizando a porta 5432.

Estando tudo ok, volte a seguir o tutorial para a inicialização do serviço do container do banco de dados PostgreSQL referente ao projeto.
