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
    res.send('<h1>Welcome to my Construction Shop</h1>')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// get all contents of database
app.get('/api/products', (req,res) => {
	res.json(products)
})

// get a single entry by id
app.get('/api/products/:id', (req,res) => {
	const id = Number(req.params.id)
    const product = products.find(i => i.id === id)
    res.json(product)
})

// delete an entry, returns status 204 with no response
app.delete('/api/products/:id', (req,res) => {
    const id  = Number(req.params.id)
    products = products.filter(i => i.id !== id) //find() / filter()
    res.send('Deleted successfully!').end()
    //res.status(204).end()
})

// add a new entry
app.post('/api/products', (req,res) => {
    const maxId = products.length > 0
        ? Math.max(...products.map(i => i.id))
        : 0
    const product = req.body
    products.push(product)
    res.json(product)
})

app.patch('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedProducts = req.body;
    products = products.map(i => {
        if (i.id === id) {
            return { ...i, ...updatedProducts};
        }
        return i;
    });
    res.json(products.find(i => i.id === id));
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedProducts = req.body;
  products = products.map((i) => {
    if (i.id === id) {
      return { ...i, ...updatedProducts };
    }
    return i;
  });
  res.json(products.find((i) => i.id === id));
});

// starts server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})