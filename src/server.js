// import express from "express";
// import routerProducts from "./routes/ProductManagerRouter.js";
// import routerCart from "./routes/CartRouter.js";
// import morgan from "morgan";

// const app = express()

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'))

// app.use('/products', routerProducts);
// app.use('/cart', routerCart);


// const PORT = 8080;
// app.listen(PORT, () => {
//     console.log(`Server in port ${PORT}`)
// })

import express from "express";
import routerProducts from "./routes/ProductManagerRouter.js";
import routerCart from "./routes/CartRouter.js";
import morgan from "morgan";
import routerViews from "./routes/viewsRouter.js";
import Handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import ProductManager from "./manager/ProductManager.js";
const app = express()

/* --------------------------------- EXPRESS -------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
/* ------------------------------- HANDLEBARS ------------------------------- */
app.engine('handlebars', Handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
/* ---------------------------------- STYLE --------------------------------- */
app.get('/style.css', function (req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
});
/* --------------------------------- ROUTES --------------------------------- */
app.use('/products', routerProducts);
app.use('/cart', routerCart);
app.use('/', routerViews)
/* --------------------------------- LISTEN --------------------------------- */
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server in port ${PORT}`)
})
/* --------------------------------- SOCKET --------------------------------- */
const socketServer = new Server(httpServer)
const productManager = new ProductManager()
socketServer.on('connection', async (socket) => {
    console.log('User connected:', socket.id)
    socket.emit('arrayProducts' , await productManager.getProducts())
    socket.on('newProduct', async (lastProduct)=>{
        await productManager.addProduct(lastProduct)
        socketServer.emit('arrayNewProduct' , (lastProduct))
    })
})