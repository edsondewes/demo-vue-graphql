# Demo Vue + node + Graphql!  
  
Este é um aplicativo de demonstração das tecnologias, com objetivo de realizar um cadastro básico de funcionários.  
  
O sistema é composto por três módulos: **autenticação**, **API GraphQL** e o **cliente Vue** para execução dos cadastros:

1. [Autenticação](#autenticação)
2. [API GraphQL](#api-graphql)
3. [Cliente Vue](#cliente-vue)
4. [Rodando o sistema com docker-compose](#rodando-o-sistema-com-docker-compose)


## Autenticação  
Servidor Node.js para realizar autenticação e geração de token JWT.  
Duas URLs são disponibilizadas:

| Url                      | Descrição                                   |  
| ------------------------ | ------------------------------------------- |  
| /?redirect=<url_cliente> | Formulário de autenticação de usuários      |  
| /cert                    | Consulta do certificado público do servidor |  
  
O endpoint para consulta do certificado pode ser utilizado para validar o token recebido pelo cliente.  
  
O objetivo deste módulo é simular o fluxo implícito do OAuth, recebendo uma URL que será utilizada para retornar ao cliente com o token gerado após a autenticação.  
  
**Esta forma de autenticação não deve ser utilizada em projetos reais. Foi utilizada apenas para fins demonstrativos.**  

Usuários registrados:

|Usuário| Senha |
|-------|-------|
| joao  | 1234  |
| maria | 1234  |

Cada usuário possui uma claim *"regiao"* diferente.  
Esta informação será utilizada na API para filtrar os registros em que o usuário tem acesso. Ou seja, "joao" não poderá ver/atualizar registros da "maria" e vice-versa.

  
## API GraphQL  
As configurações disponíveis podem ser acessadas no arquivo *appsettings.json*:
```json
{
  "auth": "http://localhost:4001",
  "mongoUrl": "mongodb://localhost:27017/demo",
  "graphql": {
    "introspection": true,
    "playground": true
  }
}
```
Para desabilitar a autenticação da API, basta alterar o parâmetro *"auth"* para *null*.

Após excutar o servidor, é possível acessar o playground do GraphQL acessando a URL raiz (**/**).  
As seguintes mutações estão disponíveis:
```graphql
  mutation adicionar($funcionario: InfoFuncionario!) {
    adicionarFuncionario(info: $funcionario) {
      id,
      nome,
      sobrenome,
      dataNascimento
    }
  } 

  mutation atualizar($id: ID!, $funcionario: InfoFuncionario!) {
    atualizarFuncionario(id: $id, info: $funcionario) {
      id,
      nome,
      sobrenome,
      dataNascimento
    }
  }
  
  mutation excluir($id: ID!) {
    excluirFuncionario(id: $id) {
      id
      nome,
      sobrenome,
      dataNascimento
    }
  }
```

Um exemplo de input *InfoFuncionario* seria:
```json
{
  "funcionario": {
    "nome": "Nome",
    "sobrenome": "Sobrenome",
    "dataNascimento":"2000-10-14"
  }
}
```

Também estão disponíveis as seguintes consultas:
```graphql
{
  listarFuncionarios(pagina: 1, tamanhoPagina: 20) {
    id,
    nome,
    sobrenome,
    dataNascimento
  }
  
  obterFuncionario(id: "5dfcba9b991c6337f8f7e53f"){
    id,
    nome,
    sobrenome,
    dataNascimento
  }
}
```

## Cliente Vue
Aplicativo web para criação/leitura/atualização/exclusão de funcionários.  
Possui uma listagem paginada e um formulário para criação/atualização de registros.

No acesso inicial, o usuário será redirecionado para o servidor de autenticação. Após o login, ele será redirecionado de volta para o aplicativo.

## Rodando o sistema com docker-compose
Acesse a pasta raiz do projeto  e inicie o os serviços utilizando docker-compose:
```bash
docker-compose up -d
```
O docker-compose irá fazer o build das imagens e iniciar o sistema em http://localhost:8080. Também será exposta a interface de administração do Traefik (proxy) em http://localhost:8081.  
Caso queira utilizar outras portas, basta alterar o *docker-compose.yml*. 

Os módulos estarão disponíveis nos seguintes endereços:

|Url       | Módulo                                 |
|----------|----------------------------------------|
| /        |  App Vue para cadastro de funcionários |
| /graphql | Playground da API GraphQL              |
| /auth    | Formulário de autenticação             |

Para fazer consultas no playground do GraphQL, será necessário obter um token de autenticação.  
Acesse http://localhost:8080/auth e faça login. O token será exibido na tela.  
Depois, acesse o playground em http://localhost:8080/graphql e coloque o seguinte HTTP Header:

```json
{
  "Authorization": "Bearer <token>"
}
```
