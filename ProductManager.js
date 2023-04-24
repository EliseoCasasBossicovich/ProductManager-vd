const fs = require('fs');

class ProductManager{
    constructor(){
        this.path = './products.json';
    }

    async addProduct(product){
        try {
            const productsFile = await this.getProducts();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);  
        }
    }
}
    // function newId(){
    //     let itemId = 0;
    //     this.products.map((product) => {
    //         if(product.id > itemId) itemId = product.id;
    //     });
    //     return itemId;
    // }id

    // getProductById = (idProduct) =>{
    //     const product = this.products.find((product) => product.id === idProduct);
    //     if(product) {
    //         console.log(product);
    //     } else {
    //         console.log('Product not found');
    //     }
    // }

const productManager = new ProductManager();

const product1 = {
    code: 'Man1',
    // id: newId(),
    name:'Manzanas',
    description:'Manzana deliciosa tamaño 80',
    price:900 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.manzanadelisiosa.com'
}
const product2 = {
    code: 'Ban1',
    // id: newId(),
    name:'Bananas',
    description:'Banannas Ecuatorianas Grandes',
    price:480 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.bananasecuatorianas.com'
}
const product3 = {
    code: 'Kiw1',
    // id: newId(),
    name:'Kiwi',
    description:'Kiwis a punto',
    price:1800 * 1.21 * 1.50,
    stock:20,
    thumbnail:'www.kiwi.com'
}

const test = async() => {
    const get = await productManager.getProducts();
    console.log('primer consulta', get);
    await productManager.addProduct(product1);
    const get2 = await productManager.getProducts();
    console.log('segunda consulta', get2);
    await productManager.addProduct(product2);
    const get3 = await productManager.getProducts();
    console.log('tercer consulta', get3);
    await productManager.addProduct(product3);
}

test()
