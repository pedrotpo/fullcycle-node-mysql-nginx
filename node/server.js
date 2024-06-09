const express = require('express')
const app = express()
const port = 3000
const { faker } = require('@faker-js/faker')

const mysql = require('mysql')

app.get('/', (req, res) => {
  const connection = mysql.createConnection({
    host: 'db',
    database: 'fullcycle',
    user     : 'root',
    password : 'root'
  })
    
  
  const insertName = (name) => `INSERT INTO people (name) VALUES ('${name}')`
  connection.query(insertName(faker.person.firstName()))
  connection.query("SELECT name FROM people", function (err, result, fields) {
    if (err) {
      res.status(500).send('Error inserting name')
      return
    }
    const nameList = result.map(({ name }) => `<li>${name}</li>`).join('')
    const response = `<h1>Full Cycle Rocks!</h1><ul>${nameList}</ul>`
    res.send(response)
    connection.end()
  })
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})