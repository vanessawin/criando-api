# criando-api

* Tenha o git instalado em sua maquina
* Tenha o node intalado em sua maquina

* Crie uma pasta chamada crud-api-anotação
* Abra a pasta no terminal e Inicialize o projeto utilizando o comando ```npm init -y```
esse comando cria um arquivo chamado package.json, ele nada mais é que um arquivo que grava as informações do projeto como  nome do projeto, versões, dependencias etc...

```
{
  "name": "crud-api-anotacao",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

* Vamos utilizar o  express.js  framwork, que nos ajuda a construir api no padrao rest(usando protocolo http) . O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel.
para saber mais  sobre [express.js]( https://expressjs.com/pt-br/)  
* Para usar o express vamos digitar no terminal o comando ``` npm install express --save```  todos os modulos que intalar vai aparecer o uma pasta chamada node-modules, outro arquivo chamado package-lockson na pasta raiz.


* Crie no diretorio raiz um arquivo chamado app.js e vamos copiar o codigo que esta  Dentro do site [express.js](https://expressjs.com/pt-br/starter/hello-world.html) no app.js,  temos a opção Hello World ele mostra o passo a passo para criar uma aplicação. Mas por enquanto só vamos copiar o código que esta nele 
``` const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

* Agora vamos executar 
* Digite no terminal ```node app.js`` 
esse comando vai dizer ao node que é para ele executar esse script que criamos que é o  app.js 
e vai aparecer  no termial a mensagen A api esta rodando em  http://localhost:3000, clica nele e vai aparecer no navegador a mensagem Hello World! Hello Vanessa! ,  para sair do servidor pressione a tecla ctrl + c
* Para não ficar reiniciando o servidor toda vez que faz alguma atualização,  vamos instalar o modulo [Nodemon](https://www.npmjs.com/package/nodemon).  O nodemon é uma ferramenta que ajuda a desenvolver aplicativos baseados em node.js, reiniciando automaticamente o aplicativo de nó quando mudanças de arquivo no diretório são detectadas. 
* Pare a aplicação que estava rodando e Digite o comando ``` npm install --save-dev nodemon``` para intalar o modulo local. 
* Para usar o nodemon vai no arquivo package.js e na parte do script digite ```"start": nodemon app.js``` porque é esse json que vai executar nossos scripts ficara assim:
``` "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```
* Agora para executar a aplicação no nodemon é só digitar no terminal ```npm start``` 
que vai aparecer isso no terminal

```
> crud-api-anotacao@1.0.0 start C:\Users\ddd\llllll\crud-api-anotacao
> nodemon app.js

[nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
A api esta rodando em  http://localhost:3000
```
Agora sim... Qualquer coisa no codigo que mudar, essa aplicação vai parar e vai subir automaticament 


### Depois de tudo instalado agora vamos construir nossa api/nossas rotas

##### Vamos utilizar alguns métodos [Http](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)

Como não vamos utilizar o banco de dados
*Dentro do arquivo app.js, depois do ``` const port = 3000 ```de um enter e crie uma variável  chamada rotes que recebe um array vazio 
```const = notes ```

Exemplo: 

```
const express = require('express')
const app = express()
const port = 3000

const notes = []
```
### Iniciando o método Get

* Adicione depois da / notes na rota

Exemplo:
```
app.get('/notes', (req, res) => 

```

* Alterar o send para json, ao invés de  uma string vamos retornar 
  para o frontend um tudo que estiver dentro do const note = [], um array

Exemplo:
  ```
  app.get('/notes', (req, res) => { 
  res.json(notes)
})

 ```

 ### Iniciando o método Post/Criar 

Ele serve para criar alguma coisa nova

* Copie o código 

``` 
app.get('/notes', (req, res) => { 
  res.json(notes)  
})

```

* Como nós vamos trabalhar com o body temos que colocar mais um item lá em cima esse código ``` app.use(express.json()) ```  depois desse ``` const port = 3000 ```
isso vai passar uma configuração para o express, para parsear todas as minhas entradas das apis por json. Para saber mais consulte [express](http://expressjs.com/pt-br/4x/api.html#req.body)

Exemplo: 

```
const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) 
``` 

* Para pegar as variaveis que o front esta mandando vamos add ``` console.log(req.body) ``` e faça o teste 

Exemplo:

```
app.post('/notes', (req, res) => { 
  // o req vai pegar as requisições do body assim consigo manipular essas informações
  console.log(req.body)
  res.json(notes) 
})
```

  Sabendo disso agora  a gente vamos conseguir extrair as informações 
* Vamos criar dois campos para para passar o titulo e a descrição 
```const title = req.body.title ``` e  ```const description = req.body.description ```

Exemplo: 

```
app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 
  res.json(notes) 
})

```
* Validando o campo title, vamos verificar se o campo title esta ou não preenchido
 copie esse código 
 ```if(!title) return res.status(400).json({ mensage: "Informe o campo title"})``` 
Se não estiver preenchido vamos enviar uma mensagem de erro. Para saber mais informações [express](http://expressjs.com/pt-br/api.html#res.status)

Exemplo:

```
app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 

  if(!title) return res.status(400).json({ mensage: "Informe o campo title"}) 

  res.json(notes) 
})

```
Obs: O return faz com que se o title não estiver preenchido, ele para e retorna  a mensagem sem precisar continuar o código que esta abaixo.

* Validando o campo description, vamos verificar se o campo description esta ou não preenchido
 copie esse código 
 ``` if(!description) return res.status(400).json({ mensage: "Informe o campo description"}) ```
Se não estiver preenchido vamos enviar uma mensagem de erro. Para saber mais informações [express](http://expressjs.com/pt-br/api.html#res.status)

Exemplo:

```
 app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 

  if(!title) return res.status(400).json({ mensage: "Informe o campo title"})

  if(!description) return res.status(400).json({ mensage: "Informe o campo description"})

  

  res.json(notes) 
})

```

* Agora se os campos title e description estiverem preenchidos precisamos inserir ele no nosso array const notes = [],  para fazer issso vamos adicionar esse código ```   notes.push({title,description}) ```

Exemplo: 

```
 app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 

  if(!title) return res.status(400).json({ mensage: "Informe o campo title"})

  if(!description) return res.status(400).json({ mensage: "Informe o campo description"})

  notes.push({title,description})

  res.json(notes) 
})

Obs: Como o campo e o valor tem o mesmo nome só precisamos colocar o mesmo nome. Caso contrario seria assim 
  notes.push({  
    title: titulo,
    description: descricao
 })

```

* Toda vez que salvamos não precisamos devolver todas as notas ```res.json(notes)``` para isso só vamos devolver uma mensagem ```res.json({ menssage: "Anotação salva com sucesso!"}) ```

Exemplo: 

```
 app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 

  if(!title) return res.status(400).json({ mensage: "Informe o campo title"})

  if(!description) return res.status(400).json({ mensage: "Informe o campo description"})

  notes.push({title,description})

 res.json({ menssage: "Anotação salva com sucesso!"}) 
})

```
* Para cada item que inseri  precisamos de um id,
porque vamos manipular o const notes = [] em algum momento. Então precisamos de um identificador, geralmente que faz isso é o banco de dados, mas como não estamos utilizando um banco de dados aqui então vamos ter que fazer isso em memória 

* Para isso vamos ter que utilizar outro modulo o npm uuid esse modulo permite que gera id unicos, que não corre risco de se repetir. Para saber mais informações [npm uuid](https://www.npmjs.com/package/uuid)
Para instalar ele , vamos no terminal e dentro da pasta raiz 
digite esse comando ``` npm install uuid ```

* Depois de instalado vamos importar nosso modulo la no começo colocando esse código ```const { v4: uuidv4 } = require('uuid')  ```

Exemplo: 

```
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = 3000

app.use(express.json()) 

``` 
* Vamos criar mais um campo no nosso objeto colocando o id e chamando a função copie e cole 
esse código dentro do objeto ``` id: uuidv4(), ``` para chamar a função do identificador 

Exemplo:

```
notes.push({
    id: uuidv4(), 
    title,
    description
  })  
  
```
* Obs: Testei esse codigo no insomnia, se não tiver ele instalado basta acessar o site para o downlad [insomnia](https://insomnia.rest/download)

Para cada registro apareceu um intedificador diferente

```
[
  {
    "id": "ce7950d1-6b02-47c4-8c6b-a03948d541c4",
    "title": "Titulo da minha anotação",
    "description": "Minha descrição teste"
  },
  {
    "id": "89ea7770-16da-4e99-ac4a-7bf4bfda9929",
    "title": "Titulo da minha anotação",
    "description": "Minha descrição teste"
  },
  {
    "id": "52aa93f8-bb9f-439a-8829-9f4585510864",
    "title": "Titulo da minha anotação",
    "description": "Minha descrição teste"
  }
]

```
Agora para cada registro temos um identificador, e atravéz do identificador vamos poder manipular eles em outra hora!


Prontinho... Nosso metodo Post esta criado!!!

### Iniciando o método Put/Editar

O metodo Put  serve para editar informações para  mais informações 
* Vamos copiar o post e colar ele antes do ``` app.listen(port, () => ```
* Altere o metodo para put

Exemplo: 

``` 
app.put('/notes', (req, res) => {        <==== Altere o metodo post para put
  const title = req.body.title
  const description = req.body.description

  if (!title) return res.status(400).json({ mensage: "Informe o campo title" })

  if (!description) return res.status(400).json({ mensage: "Informe o campo description" })

  notes.push({
    id: uuidv4(),
    title,
    description
  }) 

   res.json({ menssage: "Anotação salva com sucesso!" })
}) // cole até aqui


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/notes`)
})

```
Quando estamos fazendo um Put precisamos de um campo chamado id,  o usuario 
tem que informar qual que é o id do item que eu quero editar 
copie esse código  ```const id = req.body.id ```

Exemplo: 

```
app.put('/notes', (req, res) => {
  const id = req.body.id                     <========== e cole aqui
  const title = req.body.title
  const description = req.body.description

```

* Agora vamos validar o id, 
Se o usuário não informar o campo id no front, envie uma mensagem de erro

copie e cole o código abaixo 

```if (!id) return res.status(400).json({ mensage: "Informe o campo id" })```



Exemplo:

```
app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if (!id) return res.status(400).json({ mensage: "Informe o campo id" }) <======= cole ele assim

  if (!title) return res.status(400).json({ mensage: "Informe o campo title" })

  if (!description) return res.status(400).json({ mensage: "Informe o campo description" })

```

* Se o usuário passou o id, temos que verificar se ele existe no array que estamos salvando,

  
 copie e cole esse código  ``` const note = notes.find((n) => n.id === id) ```

 Exemplo: 

```
 app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if (!id) return res.status(400).json({ mensage: "Informe o campo id" })

  const note = notes.find((n) => n.id === id)               <===== cole assim 

  if (!title) return res.status(400).json({ mensage: "Informe o campo title" })

  if (!description) return res.status(400).json({ mensage: "Informe o campo description" })

```

Obs: Essa função vai procurar  o id dentro do array para fazer a pesquisa
Se o id for igual, essa função vai retornar o objeto para o note


* Vamos validar o note tabém 
copie e cole o código 
```if (!note) return res.status(400).json({ mensage: "Nenhuma anotação encontrada para o id informado" } )``

Exemplo:

```
 app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if (!id) {
    return res.status(400).json({ mensage: "Informe o campo id" })
  }
  const note = notes.find((n) => id === id)  

  if (!note) { 
    return res.status(400).json({ mensage: "Nenhuma anotação encontrada para o id informado" })                                                      <======= cole assim
  }

  if (!title) {
    return res.status(400).json({ mensage: "Informe o campo title" })
  }

  if (!description) {
    return res.status(400).json({ mensage: "Informe o campo description" })
  }


Obs: Agora coloquei  {} em cada validação 

```
* Agora vamos manipular o array
apague essa parte do código 

```
notes.push({
    id: uuidv4(),
    title,
    description
  }) 

``` 
* Cole esse outro código no lugar

```
 for(const noteObject of notes){
      if(noteObject.id === id){
        noteObject.title = title
        noteObject.description = description
      }
  }

```
Vou descrever o código acima

Esse for vai salvar toda a informação do array notes dentro do noteObject ```(const noteObject of notes) ```
Depois vai fazer a condição/comparação  do id ``` if(noteObject.id === id) ```
Se o id for igual vamos alterar os campos title e description

``` noteObject.title = title ```

``` noteObject.description = description ```

* Vamos mudar a mensagem do  também ``` res.json ```

Exemplo:

```
 
  for(const noteObject of notes){
      if(noteObject.id === id){ 
        noteObject.title = title 
        noteObject.description = description
      }
  }

  res.json({ menssage: "Anotação alterada com sucesso!" }) <======== ficara assim
})

``` 
Parabés o metodo put foi criado com sucesso!!!
