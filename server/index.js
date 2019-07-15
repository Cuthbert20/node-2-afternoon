const express = require('express')
const app = express()
const PORT = 3001
const mc = require('./controllers/messages_controller')

app.use(express.json())
//
app.use(express.static(__dirname + '/../public/build'))
//here we are assigning the url to a variable so that we don't 
//have to type it over and over.
const messagesBaseUrl = '/api/messages'
app.get(messagesBaseUrl, mc.read)
app.post(messagesBaseUrl, mc.create)
//for update and delete endpoints, we need to add on a url parameter of id. url params can be defined by adding : when making the URL for and endpoint
app.put(`${messagesBaseUrl}/:id`, mc.update)
app.delete(`${messagesBaseUrl}/:id`, mc.delete)



app.listen(PORT, () => console.log(`${PORT} is always listening`))
//notes for future reference
// http://localhost:3001/api/messages ( POST ) - create from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( GET ) - read from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( PUT ) - update from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( DELETE ) - delete from messages_controller executes - responds with messages array.