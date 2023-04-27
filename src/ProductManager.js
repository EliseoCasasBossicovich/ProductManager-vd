// import fs from 'fs';
import fs from 'fs';

const path = './products.json'

class ProductManager {
    #baseId = 0;
    #iva = 1.21;
    #profit = 1.50;
    constructor(path) {
        this.path = path;
        this.productsList = []
    }

    async addProduct(name, description, price, stock, thumbnail) {
        const product = {
            id: this.#newId() + 1,
            code: 'ver' + this.#newCode() + 1,
            name,
            description,
            price: price * this.#iva * this.#profit,
            stock,
            thumbnail
        }
                try {
            if (!name || !description || !price || !thumbnail || !stock) {
                return console.log('Enter the required data.')
            } else {
                if (fs.existsSync(path)) {
                    this.productsList.push(product)
                    await fs.promises.writeFile(path, JSON.stringify(this.productsList));
                    return console.log(`¡: ${product.name}!`)
                } else {
                    return console.log('An error has occurred in the upload.')
                }
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJS = JSON.parse(products)
                    return console.log('PRODUCTS LIST: ', productsJS)
                }
                else {
                    return console.log('EMPTY LIST.')
                }
            } else {
                return console.log('List does not exist or could not be loaded.')
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
                    //PRODUCT
                    const productFound = productsJSON.filter((prod) => prod.id == idProduct); 
                    // NEW ARRAY
                    const productFilter = productsJSON.filter((prod) => prod.id != idProduct); 
                    if (productFound) {
                        await fs.promises.writeFile(path, JSON.stringify(productFilter))
                        return console.log('Product removed successfully: ', productFound)
                    } else {
                        return console.log('The product could NOT be deleted. The product is non-existent.')
                    }
                } else {
                    return console.log('Storage is empty.')
                }
            } else {
                return console.log('There is no product or storage.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async updateProduct(idProduct, price) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    let productFilter = productsJSON.filter((prod) => prod.id == idProduct)
                    if(productFilter.length != 0){
                        const productRest = productsJSON.filter((prod) => prod.id != idProduct)
                        productFilter = {...productFilter[0], price: price}
                        const productUpdate = [...productRest, productFilter]
                        await fs.promises.writeFile(path, JSON.stringify(productUpdate))
                        return console.log('UPDATED PRODUCT: ', productFilter)
                    }else{
                        return console.log('Product ID does NOT exist..')
                    }
                } else {
                    return console.log('Storage is empty.')
                }
            } else {
                return console.log('List does not exist or could not be loaded.')
            }
        } catch (error) {
            return console.log(error)
        }
    }
    #newCode() {
        const randomNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let code = []
        const codeLength = 5;
        for (let i = 1; i <= codeLength; i++) {
            let number = parseInt(Math.random() * randomNum.length)
            code.push(randomNum[number])
        }
        code = code.join('')
        return code
    }
    #newId() {
        this.#baseId += 1
        let id = this.#baseId
        return id;
    }

    async getProductById(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJS = JSON.parse(products)
                    const productFilter = productsJS.filter((product) => product.id == idProduct)
                    return console.log('FOUND PRODUCT: ', productFilter[0])
                } else {
                    return console.log('Empty storage.')
                }
            } else {
                return console.log('List does not exist or could not be loaded.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

}

const productManager = new ProductManager()

const test = async ()=>{
    try{
        await productManager.addProduct('Manzanas', 'Manzana deliciosa tamaño 80', 900, 20, 'www.manzanadelisiosa.com')
        await productManager.addProduct('Bananas', 'Banannas Ecuatorianas Grandes', 480, 20, 'www.bananasecuatorianas.com')
        await productManager.addProduct('Kiwis', 'Kiwis a punto', 1800, 20, 'www.kiwi.com')
        await productManager.addProduct('Peras', 'Peras Maduras', 480, 20, 'www.peraswilliam.com')
        await productManager.addProduct('Sandía', 'Sandías brasileras', 200, 20, 'www.sandiasbr..com')
        await productManager.addProduct('Mandarinas', 'Mandarinas criollas', 400, 20, 'www.mandarinascriollas')
        await productManager.getProducts()
        await productManager.getProductById(2)
        await productManager.deleteProduct(1)
        await productManager.updateProduct(3, 1200) 
        await productManager.getProducts()
    }catch(error){
        console.log(error)
    }
}

test()

export default productManager;