require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time :body ms'))

let persons = [
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
];


app.get('/api/persons', (req, res) => {

    Person.find().then(persons => res.json(persons));

})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    Person.findOne({ _id: id })
        .then(person => res.json(person))
        .catch(err => res.json({ error: err }));

})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }

    Person.findOne({ name: body.name })
        .then(person => {
            if (person) {
                return res.status(401).json({ error: 'name exists', person })
            }
            const newPerson = new Person({
                name: body.name,
                number: body.number,
            })
            newPerson.save().then(savedPerson => {
                res.json(savedPerson)
            })
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    let info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date().toString()}</p>`
    res.send(info)
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}


app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})