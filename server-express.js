import express from "express";
import {products} from './src/ProductManager.json'

const app = express();
const PORT = 8080

products.map(producto=> console.log(JSON(producto)))

app.get('/', (req, res) =>{
    res.send('Home response.')
})

app.listen(PORT, ()=>{
    console.log(`Port server ${8080}.`)
})