require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const PhoneBook = require('./models/phoneBook')

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

const generatedId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => Number(p.id)))
        : 0
    return String(maxId + 1)
}

const requestTime = function (request, response, next) {
    const date = new Date(Date.now())
    request.requestTime = date
    next()
}

const loggerDetails = morgan(function (tokens, req, res) {
    morgan.token('body', (req, res) => JSON.stringify(req.body))
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        tokens['response-time'](res, req), 'ms',
        tokens['body'](req, res)
    ].join(' ')
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}


app.use(express.json())
app.use(requestTime)
app.use(morgan('tiny'))
app.use(loggerDetails)
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    PhoneBook.find({}).then(results => {
        response.json(results)
    })
})

app.get('/info', (request, response, next) => {
    PhoneBook.countDocuments({})
        .then(results => {
            // console.log(results)
            response.send(`<p>${`Phonebook has info for  ${results} people`}</p>`)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const person = persons.find((person) => person.id === id)
    // if (person) {
    //     return response.status(200).json(person)
    // } else {
    //     return response.status(404).json({
    //         error: `no such person with ${id}`
    //     })
    // }  
    PhoneBook.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            }
            if (!result) {
                return response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const personExists = persons.find((person) => person.id === id)
    
    // if (!personExists) {
    //     return response.status(404).json({
    //         error: `Person with ID: ${id} doesn't exists`
    //     })
    // }

    // persons = persons.filter((person) => person.id !== id)
    // response.status(204).end()
    PhoneBook.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // personName = persons.find((person) => person.name === body.name)
    // // console.log(personName)

    // if (personName) {
    //     return response.status(405).json({
    //         error: 'name must be unique'
    //     })
    // }

    // if (!body.name) {
    //     return response.status(400).json({
    //         error: 'name missing'
    //     })
    // }

    // if (!body.number) {
    //     return response.status(400).json({
    //         error: 'number missing'
    //     })
    // }

    // const person = {
    //     id: generatedId(),
    //     name: body.name,
    //     number: body.number,
    // }
    // persons = persons.concat(person)
    
    // response.status(201).json(person)
    // request.loggerDetails
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    PhoneBook.findOne({name: body.name}).then(existing => {
        if (existing) {
            existing.number = body.number

            return existing.save()
                .then(updated => {
                    response.json(updated)
                })
                .catch(error => next(error))
        } else {
            const phonebook = new PhoneBook({
                name: body.name,
                number: body.number
            })
            phonebook.save().then(result => {
                response.json(result)
            })
        }
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    PhoneBook.findById(request.params.id)
        .then(updated => {
            if(!updated) {
                return response.status(404).end()
            }

            updated.name = name
            updated.number = number

            return updated.save().then(updatedPhone => {
                response.json(updatedPhone)
            })
            .catch(error => next(error))
        })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})