const { response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

let persons = [
    {
        id: 1,
        name: "Faija Mehiläinen",
        number: "2210-001",
    },
    {
        id: 2,
        name: "Mamma Mehiläinen",
        number: "999-11-2222",
    },
    {
        id:3,
        name: "Maija Mehiläinen",
        number: "666-69696",
    },
    {
        id:4,
        name: "Kaija Mehiläinen",
        number: "777-7979797"
    }
]
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.use(express.json())

app.get('/info', (req, res) => {
    pmaara = persons.length
    paiva = new Date();
    res.send(`<p>Phonebook has info for ${pmaara} people</p><div>${paiva}</div>`)
  })

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const nim = persons.find(nim => nim.id === id)
    
    if (nim) {
    res.json(nim)
    } else {
        res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(nim => nim.id !== id)
    res.status(204).end()
  })
  
app.get('/api/persons',(req, res) => {
    res.json(persons)

})

const personId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ 
            error: 'no name' 
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'no number'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: personId()
    }
    
    persons = persons.concat(person)
    
    res.json(person)
    })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})