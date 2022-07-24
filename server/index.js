require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {getVenues, createEvent, getEvents, deleteEvent,createTicket, getTickets, deleteTickets} = require('./controller.js')

app.use(express.json())
app.use(cors())


app.get('/venues', getVenues)
app.post('/events', createEvent)
app.get('/events', getEvents)
app.delete('/events/:id', deleteEvent)
app.post('/tickets', createTicket)
app.get('/tickets', getTickets)
app.delete(`/tickets/:id`, deleteTickets)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))