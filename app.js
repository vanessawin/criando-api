const express = require('express')
const app = express()
app.use(express.json()) // passando uma configuração para o express, 
//para parsear todas as minhas entradas das apis para json
const port = 3000

//como não vamos utilizar banco de dados/ vamos utilizar um banco em memória 
//criar uma variavel chamada rotes. que recebe um array vazio
const notes = []


// Metodo Get
app.get('/notes', (req, res) => { //adicione depois da / notes na rota
  res.json(notes) // alterar o send para json, ao inves de  uma string eu vou retornar 
  //para o frontend um tudo que estiver no const note = [], um array
})

// Metodo Post
//Altere o metodo get para Post
app.post('/notes', (req, res) => { 
  const title = req.body.title 
  const description = req.body.description 

  
  res.json(notes) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/notes`)
})