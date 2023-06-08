import { Router } from "express";
import { addToCartController, changeQuantityController, createCartController, deleteProductInCartController, emptyCartcontroller, getAllCartsController, getCartByIdController, updateCartProductsByArrayController } from "../controllers/cartController.js";

const routerCartMongoose = Router()

routerCartMongoose.get('/', getAllCartsController)
routerCartMongoose.get('/:id', getCartByIdController)
routerCartMongoose.post('/', createCartController) 
routerCartMongoose.put('/:cid/:pid', addToCartController)
routerCartMongoose.delete('/:cid', emptyCartcontroller) 
routerCartMongoose.delete('/:cid/products/:pid', deleteProductInCartController)
routerCartMongoose.put('/:cid/products/:pid', changeQuantityController)
routerCartMongoose.put('/:cid', updateCartProductsByArrayController) 





export default routerCartMongoose;