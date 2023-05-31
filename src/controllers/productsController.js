import ProductsManagerMongoose from "../daos/mongoose/ProductManagerMongoose.js";

const productManager = new ProductsManagerMongoose()

export const getAllController = async (req, res, next) => {
    try {
        const docs = await productManager.getAllProducts()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}

export const getProductsByIdController = async (req, res, next) => {
    try {
        const { id } = req.params
        const docs = await productManager.getProductById(id)
        if (!docs) {
            throw new Error("The product doesn't exist.")
        } else {
            res.json(docs)
        }
    } catch (error) {
        next(error)
    }
}

export const createProductController = async (req, res, next) => {
    try {
        const { title, description, category, code, price, thumbnail, stock } = req.body;
        const newProduct = await productManager.createProduct({
            title,
            description,
            category, code,
            price,
            thumbnail,
            stock
        });
        if (!newProduct) {
            throw new Error('Could not create product.')
        } else {
            res.json('Product created:', newProduct)
        }
    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body;
        const updateProduct = await productManager.updateProduct(id, {
            title,
            description,
            category, code,
            price,
            thumbnail,
            stock
        });
        if (!updateProduct) {
            throw new Error('Could not update the product.')
        } else {
            res.json('Updated product:', updateProduct)
        }
    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async () => {
    try {
        const { id } = req.params

        const deleteProduct = await productManager.deleteProduct(id)
        if(!deleteProduct){
            throw new Error ('Could not delete the product');
        }else{
            console.log('¡Product removed!')
            res.json(deleteProduct)
        }
    } catch (error) {
        next(error)
    }
}