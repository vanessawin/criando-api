const express = require('express')
const { v4: uuidv4 } = require('uuid') //importando o modulo para gerar o id
const cors = require('cors') //importando 
const app = express()
app.use(express.json()) // passando uma configuração para o express, 
//para parsear todas as minhas entradas das apis para json
app.use(cors()) // configurando
const port = 3000

//como não vamos utilizar banco de dados/ vamos utilizar um banco em memória 
//criar uma variavel chamada rotes. que recebe um array vazio
const notes = []


// Metodo Get
app.get('/notes', (req, res) => { //adicione depois da / notes na rota
  res.json(notes) // alterar o send para json, ao inves de  uma string eu vou retornar 
  //para o frontend um tudo que estiver no const note = [], um array
})

app.get('/notes/:id', (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({ mensage: "Informe o campo id" })
  }
  const note = notes.find((n) => n.id === id)

  if (!note) {
    return res.status(400).json({ mensage: "Nenhuma anotação encontrada para o id informado" })
  }


  res.json(note.title)
})

// Metodo Post
//Altere o metodo get para Post
app.post('/notes', (req, res) => {
  const title = req.body.title
  const description = req.body.description

  // Validando o campo title
  // Verificar se o campo title não estiver preenchido 
  if (!title) return res.status(400).json({ mensage: "Informe o campo title" })

  // Validando o campo description
  // Verificar se o campo description não estiver preenchido 
  if (!description) return res.status(400).json({ mensage: "Informe o campo description" })

  //Inserindo as informações dentro do notes
  notes.push({
    id: uuidv4(), //chamando a função do gerador de id
    title,
    description
  }) // como o campo e o valor tem o mesmo nome só precisamos colocar o mesmo nome

  // //caso contrario seria assim 
  // notes.push({
  //   title: title,
  //   description: description
  // })
  res.json({ menssage: "Anotação salva com sucesso!" })
})

// Método Put
app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if (!id) {
    return res.status(400).json({ mensage: "Informe o campo id" })
  }

  // Se o usuário passou o id, temos que verificar se ele existe no array que estamos salvando
  // Procurar alguma coisa dentro do array, passo uma função para fazer a pesquisa
  // Se o id for igual, essa função vai retornar o objeto para o note

  const note = notes.find((n) => n.id === id)

  // Se o id não existir, envie uma mensagem
  if (!note) {
    return res.status(400).json({ mensage: "Nenhuma anotação encontrada para o id informado" })
  }
  if (!title) {
    return res.status(400).json({ mensage: "Informe o campo title" })
  }
  if (!description) {
    return res.status(400).json({ mensage: "Informe o campo description" })
  }
  // Manipulando o array notes
  for (const noteObject of notes) {
    if (noteObject.id === id) { //se o id do obj for igual ao que foi informado
      noteObject.title = title //altera o title que foi passado como parametro
      noteObject.description = description //altera a description que foi passado como parametro
    }
  }

  res.json({ menssage: "Anotação alterada com sucesso!" })
})

// Método Delete
app.delete('/notes', (req, res) => {
  const id = req.body.id

  if (!id) {
    return res.status(400).json({ mensage: "Informe o campo id" })
  }

  const note = notes.find((n) => n.id === id)
  if (!note) {
    return res.status(400).json({ mensage: "Nenhuma anotação encontrada para o id informado" })
  }
  for (const index in notes) {
    if (notes[index].id === id) {
      notes.splice(index, 1)
    }
  }
  res.json({ menssage: "Anotação excluida com sucesso!" })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/notes`)
})

