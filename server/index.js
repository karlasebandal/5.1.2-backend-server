const express = require('express')
const app = express()

const PORT = 3001

let products =  [
    { 
        id: 1, 
        title: 'Product 1', 
        price: 100.00, 
        quantity: 0,
    },
    { 
        id: 2, 
        title: 'Product 2', 
        price: 200.00, 
        quantity: 0, 
    },
    { 
        id: 3, 
        title: 'Product 3', 
        price: 250.00, 
        quantity: 0,
    },
    { 
        id: 4, 
        title: 'Product 4', 
        price: 250.00, 
        quantity: 0,
    }
  ]

// responds to requests on root URL '/', e.g. localhost:3001/
app.get('/', (req,res) => {
    res.send('<h1>here comes the node express train!</h1>')
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.send('<h1>Welcome to RF1 Batch</h1>')
})

// get all contents of database
app.get('/api/products', (req,res) => {
	res.json(products)
})

// get a single entry by id
app.get('/api/products/:id', (req,res) => {
	const id = Number(req.params.id)
    const joke = products.find(joke => joke.id === id)
    res.json(joke)
})

// delete an entry, returns status 204 with no response
app.delete('/api/products/:id', (req,res) => {
    const id  = Number(req.params.id)
    products = products.filter(joke => joke.id !== id)
    res.status(204).end()
})

// add a new entry
app.post('/api/products', (req,res) => {
    const maxId = products.length > 0
        ? Math.max(...products.map(n => n.id))
        : 0
    const joke = req.body
    products.push(joke)
    res.json(joke)
})

app.patch('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedJoke = req.body;
    products = products.map(joke => {
        if (joke.id === id) {
            return { ...joke, ...updatedJoke };
        }
        return joke;
    });
    res.json(products.find(joke => joke.id === id));
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedJoke = req.body;
  products = products.map((joke) => {
    if (joke.id === id) {
      return { ...joke, ...updatedJoke };
    }
    return joke;
  });
  res.json(products.find((joke) => joke.id === id));
});

// starts server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})