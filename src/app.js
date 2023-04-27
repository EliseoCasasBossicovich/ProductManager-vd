import express from "express";
import products from './products.json' assert {type: 'json'}

const app = express()
const PORT = 8080;

app.get('/', (req, res)=>{
    res.send('HOME')
})

app.get('/products', (req, res)=>{
    res.json(products)
})

app.get('/filterproducts', (req, res)=>{
    const {limit} = req.query;
    
    const productsLimit = products.slice(0, limit)

    if(productsLimit.length != 0){
        res.json(productsLimit)
    }else{
        res.json(products)
    }
})

app.get('/products/:pid', (req, res)=>{
    const {pid} = req.params;

    const productFilter = products.find(prod => prod.id == parseInt(pid))

    if(productFilter){
        res.json(productFilter)
    }else{
        res.status(404).json({message:'Product ID does not exist.'})
    }
})

app.listen(PORT, () =>{
    console.log(`Port server ${PORT}`)
})