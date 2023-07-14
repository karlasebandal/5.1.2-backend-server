require('dotenv').config();

const express = require('express')
//const app = express()
const { Pool } = require('pg');
//const PORT = 3001

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  
  const app = express();
  const bodyParser = require('body-parser');
  const PORT = 3000;
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

// let products =  [
//     { 
//         id: 1, 
//         title: 'Product 1', 
//         price: 100.00, 
//         quantity: 0,
//     },
//     { 
//         id: 2, 
//         title: 'Product 2', 
//         price: 200.00, 
//         quantity: 0, 
//     },
//     { 
//         id: 3, 
//         title: 'Product 3', 
//         price: 250.00, 
//         quantity: 0,
//     },
//     { 
//         id: 4, 
//         title: 'Product 4', 
//         price: 250.00, 
//         quantity: 0,
//     }
//   ]

// responds to requests on root URL '/', e.g. localhost:3001/

app.get('/', (req,res) => {
    res.json({ info: 'CRUD app with PostgreSQL and Node.js' })
})

// get all products of database
app.get('/products', (req,res) => {
	pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
    })
})

// get a single products by id
app.get('/products/:id', (req,res) => {
	const id = parseInt(req.params.id);
    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
})

// delete an entry, returns status 204 with no response
app.delete('/products/:id', (req,res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User ${id} deleted`);
  });
})

// add a new entry
app.post('/products', (req,res) => {
    const { prod_name, prod_price } = req.body;
    pool.query(
    'INSERT INTO products (prod_name, prod_price) VALUES ($1, $2) RETURNING *',
    [prod_name, prod_price],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  )
})

// app.patch('/products/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const updatedProducts = req.body;
//     products = products.map(i => {
//         if (i.id === id) {
//             return { ...i, ...updatedProducts};
//         }
//         return i;
//     });
//     res.json(products.find(i => i.id === id));
// });

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { prod_name, prod_price } = request.body;
    pool.query(
      'UPDATE products SET prod_name = $1, prod_price = $2 WHERE prod_id = $3',
      [prod_name, prod_price, prod_price],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User ${prod_price} updated`);
      }
    )
})

// starts server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})