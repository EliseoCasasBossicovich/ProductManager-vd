const fs = require('fs');
const path = './objets.json';
class ProductManager{
    #iva = 1.21;
    #profit = 1.50;
    constructor(){
        this.products = [];
    }
    async createObjet(objet){
        try {
            const objetsFile = await this.getUsers();
            usersFile.push(objet);
            await fs.promises.writeFile(path, JSON.stringify(objetsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async getObjets(){
        try {
            if (fs.existsSync(path)){
                const products = await fs.promises.readFile(path, 'utf8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);  
        }
    }

    addProduct(name, description, price, stock, thumbnail){
        const product = {
            id: this.#newId() + 1,
            name,
            description,
            price: price * this.#iva * this.#profit,
            stock,
            thumbnail,
        };
        this.products.push(product);
    }

    #newId(){
        let itemId = 0;
        this.products.map((product) => {
            if(product.id > itemId) itemId = product.id;
        });
        return itemId;
    }id

    getProductById = (idProduct) =>{
        const product = this.products.find((product) => product.id === idProduct);
        if(product) {
            console.log(product);
        } else {
            console.log('Product not found');
        }
    }

}

const productManager = new ProductManager();
productManager.addProduct('Manzanas', 'Manzana deliciosa tamaño 80', 900, 20, 'www.manzanadelisiosa.com');
productManager.addProduct('Bananas', 'Banannas Ecuatorianas Grandes', 480, 20, 'www.bananasecuatorianas.com');
productManager.addProduct('Kiwi', 'Kiwis a punto', 1800, 20, 'www.kiwi.com');
const test = async() => {
    const get = await productManager.getObjets();
    console.log('primer consulta', get);
    const get2 = await productManager.getObjets();
    console.log('segunda consulta', get2);
}

test()