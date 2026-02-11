# Cadastrei Usuarios

Um projeto simples de cadastro de usuarios, usando o Java Spring no backend e o Js Angular no frontend
 
## Como Executar

### Backend

Para facilitar o desenvolvimento do backend foi utilizada a IDE IntelliJ, então para facilitar a execução da aplicação recomendo abrir o projeto na IDE IntelliJ, pois foi adicionado uma configuração para rodar a aplicação utilizando o IntelliJ IDEA.
A configuração do banco de dados está em um arquivo .env na raiz do projeto do backend, e caso não tenha nenhum banco em sua máquina, foi adicionado um `compose.db.yml` configurando um serviço do postgres, com as mesmas configs do .env. 

### Frontend

O projeto do frontend é mais facil de executar basta instalar as dependencias com `npm install` e então `npm start`. Como não há planos até o momento de colocar os projetos em produção, as requests do frontend estão apontando 'hardcoded' para localhost:8080.
