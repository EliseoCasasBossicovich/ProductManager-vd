import fs from 'fs';

const path = 'src/manager/ProductManager.json'

class ProductManager {
    #newId = 0;
    constructor(path) {
        this.path = path;
        this.listProducts = []
    }

    async #createId() {

        const products = await fs.promises.readFile(path, 'utf-8')
        const productJSON = JSON.parse(products)
        if(productJSON.length > 0){
            const products = await this.getProducts()
            let id = products[products.length-1].id + 1
            return id;
        }else{
            this.#newId += 1
            let id = this.#newId
            return id;
        }

    }

    async getProducts() {
        try {

            if (fs.existsSync(path)) {
                const products = await fs.promises.readFile(path, 'utf-8')
                if(products.length == 0){
                    await fs.promises.writeFile(path, JSON.stringify([]))
                }else{
                    const productsJSON = JSON.parse(products)
                    return productsJSON
                }
            } else {
                return []
            }

        } catch (error) {
            return console.log(error)
        }
    }

    async addProduct(obj) {

        try {
            const product = {
                id: await this.#createId(),
                ...obj
            }
            const all = await this.getProducts()
            all.push(product)
            await fs.promises.writeFile(path, JSON.stringify(all));
            return product
        } catch (error) {
            return console.log(error)
        }

    }

    async getProductById(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFilter = productsJSON.filter((prod) => prod.id == idProduct)
                    return productFilter[0]
                } else {
                    return console.log('Storage empty')
                }
            } else {
                return console.log('Storage does not exist or could not be read.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async deleteProduct(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFound = productsJSON.filter((prod) => prod.id == idProduct);
                    const productFilter = productsJSON.filter((prod) => prod.id != idProduct); 
                    if (productFound) {
                        await fs.promises.writeFile(path, JSON.stringify(productFilter))
                        return productFound
                    } else {
                        return console.log('The product could NOT be deleted. The product is non-existent.')
                    }
                } else {
                    return console.log('The storage is empty.')
                }
            } else {
                return console.log('The product or storage does not exist.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async updateProduct(obj, id) {
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(prod => prod.id === id);
            console.log('Index:', index);
            if (index === -1) {
                throw new Error(`ID: ${id} not found`)
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
            return productsFile[index]
        } catch (error) {
            console.log(error);
        }
    }

}

const productManager = new ProductManager()

const test = async ()=>{
    try{
        await productManager.getProducts()
        await productManager.addProduct({name:'Manzanas', description:'Manzana deliciosa tamaño 80', price:900, stock:20, thumbnail:'www.manzanadelisiosa.com'})
        await productManager.addProduct({name:'Bananas', description:'Banannas Ecuatorianas Grandes', price:480, stock:20, thumbnail:'www.bananasecuatorianas.com'})
        await productManager.addProduct({name:'Kiwis', description:'Kiwis a punto', price:1800, stock:20, thumbnail:'www.kiwi.com'})
        await productManager.addProduct({name:'Peras', description:'Peras Maduras', price:480, stock:20, thumbnail:'www.peraswilliam.com'})
        await productManager.addProduct({name:'Sandía', description:'Sandías brasileras', price:200, stock:20, thumbnail:'www.sandiasbr..com'})
        await productManager.addProduct({name:'Mandarinas', description:'Mandarinas criollas', price:400, stock:20, thumbnail:'www.mandarinascriollas'})
    }catch(error){
        console.log(error)
    }
}

test()
export default ProductManager;