
# Abordagens Front-End
---
## Abordagem Tradicional

(Any API Client) <- Http Request / Http Response (HTML) -> Server (HTML, CSS, JS)

- Abordagem tradicional, a cada requisição, o servidor retorna o conteudo completo da pagina, contendo todo o HTML, CSS e JavaScript
- Essa abordagem limita o front-end para o browserja que o aplicativo mobile ou servicos externos nao vao conseguir interprestar adequadamente o HTML

## Abordagem SPA (Single Page Application)

(Any API Client) (HTML, CSS, JS) <- Http Request / Http Response (JSON) -> Server

- Na abordagem SPA, as requisicoes trazem apenas dados como respostas. Com esses dados o front-end renderiza as informacoes em tela
- A pagina nunca recarrea, otimizando a performance e dando vida ao conceito de SPA (Single Page Application). Retornando apenas JSON podemos ter quantos front-ends quisermos

---
## Arquitetura Front-end (React) e Back-end (API)

React
- Router
- Components
- Service
- axios (HTTP)

API
- Rest Controller
- Service Business
- Repository

Database
- Data

Fluxo de comunicacao
- React (axios) <- HTTP -> API (Rest Controller) <--> Database

---

## Criando o Client React

WPS Admin
- $ npx create-react-app clien

---
## Entendendo a estrutura dos arquivos

- public/index.html é o primeiro inicializado pelo navegador
	- o react controla tudo dentro do div com id= root
- logo apos, o index.js carrega
	- importa o React
	- importa o ReactDom
	- encontra o div id=root
	- injeta os componentes react
		- são funções em javascript que retornam html
		- manipulam html, css ou só javascript
		- arquivos JSX -> JavaScript XML
			- HTML imbutido em codigos JavaScripts

- Existe uma conexão WebSocket, um conexão bidirecional
	- Qualquer mudança no servidor, altera no browser
	- "Live Reload"

## Conceito de propriedade

- igual em html id = ""
- propriedades são passados para componentes em react ao inves de elementos
- passados como parametro em cada componente
	- props
	- {children}

## Conceito de Estado e Imutabilidade

- Estado - informação a ser mantida pelo Componente/React
	- Manipular dados (add, rem)
	- Variaveis no React são estados -> garantir mais performance (mantido pelo react)
		- Array \[value, changeValueFunction]
- Imutabilidade
	- So consigo mudar os valores, se eu usar o estado
	- Maior performance
	- Protege nossa aplicação contra outras variaveis que saem do controle

## NOTA


- Tive que alterar \<Switch /> por \<Routes> e component={Login} por element={<Login />}

- Tive que fazer o downgrade para o React 18
	- Pois estava com um erro de invalidHookCall no DOM
	- Pois criei o projeto react com create-react-app (CRA 5 antigo) que é incompatível com o React19, mas compativel com o React 18
		- Para isso tive que:
			- remover node_modules
			- remover package-lock.json
			- $ npm i -E react@18.3.1 react-dom@18.3.1
				- downgrade
			- $ npm i -E @testing-library/react@14
				- alinhamento de bibliotecas populares
			- $ npm i -E react-router-dom@6
				- alinhamento de bibliotecas populares
			- $ npm install
			- $ npm start

- Tive que alterar o useHistory, pois agora no React v6, usamos useNavigate
