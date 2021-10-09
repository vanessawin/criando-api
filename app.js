const express = require('express')
const app = express()
const port = 3000

//como não vamos utilizar banco de dados/ vamos utilizar um banco em memória 
//criar uma variavel chamada rotes. que recebe um array vazio
const notes = []

app.get('/notes', (req, res) => { //adicione depois da / notes na rota
  res.json(notes) // alterar o send para json, ao inves de  uma string eu vou retornar 
  //para o frontend um tudo que estiver no const note = [], um array
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/notes`)
})