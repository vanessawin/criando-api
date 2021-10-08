const express = require('express') //importa aquele modulo que a gente instalou
const app = express()
const port = 3000 // qual porta que vai estar rodar nossa api

app.get('/', (req, res) => {
  res.send('Hello World! Hello Vanessa.eiii') // quando eu chamar essa rota ele vai responder no navegador  Hello World! Hello Vanessa
})

app.listen(port, () => { // fica escutando 
  console.log(`A api esta rodando em  http://localhost:${port}`)
})
