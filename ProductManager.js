const fs = require('fs');
const path = './products.json'
class ProductManager{
    #iva = 1.21;
    #profit = 1.50;
    // constructor(){
    //     this.path = './products.json';
    // }
    
    async createProduct(obj){
        const {name, description, price, stock, thumbnail} = obj;
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
            const productsFile = await this.getObjets();
            productsFile.push(product);
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }
    async getObjets(){
        try {
            if (fs.existsSync(path)){
                const objets = await fs.promises.readFile(path, 'utf8');
                const objetsJS = JSON.parse(objets);
                return objetsJS;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);  
        }
    }


    async #newId(){
        let itemId = 0;
        const objetsList = await this.getObjets();
        const product = objetsList.find((product) => {
            if(product.id > itemId) itemId = product.id;
        });
        return itemId;
    }id

    async #newCode(){
        let itemCode = 0;
        const objetsList = await this.getObjets();
        const product = objetsList.find((product) => {
            if(product.code != itemCode) itemCode = product.code;
        });
        return itemCode;
    }code

    async getProductById (id){
        const objetsList = await this.getObjets();
        const product = objetsList.find((product) => product.id === id);
        if(product) {
            console.log(product);
        } else {
            console.log('Product not found');
        }
    }
    async getProductByCode (code){
        const objetsList = await this.getObjets();
        const product = objetsList.find((product) => product.code === code);
        if(product) {
            console.log(product);
        } else {
            console.log('Product not found');
        }
    }
}


const productManager = new ProductManager();
const product1 = {
    code: 'Man1',
    name:'Manzanas',
    description:'Manzana deliciosa tamaño 80',
    price:900 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.manzanadelisiosa.com'
}
const product2 = {
    code: 'Ban1',
    name:'Bananas',
    description:'Banannas Ecuatorianas Grandes',
    price:480 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.bananasecuatorianas.com'
}
const product3 = {
    code: 'Kiw1',
    name:'Kiwi',
    description:'Kiwis a punto',
    price:1800 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.kiwi.com'
}

async function test(){
    // Agrego productos
    await productManager.createProduct(product1);
    await productManager.createProduct(product2);
    await productManager.createProduct(product3);
    const products = await productManager.getObjets();
    console.log(products);
    await productManager.getProductById(1)
    await productManager.getProductByCode()
}

test()
