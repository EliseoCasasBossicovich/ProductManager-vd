class ProductManager{
    #iva = 1.21;
    #profit = 1.50;
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
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
// Agrego productos
productManager.addProduct('Manzanas', 'Manzana deliciosa tamaño 80', 900, 20, 'www.manzanadelisiosa.com');
productManager.addProduct('Bananas', 'Banannas Ecuatorianas Grandes', 480, 20, 'www.bananasecuatorianas.com');
productManager.addProduct('Kiwi', 'Kiwis a punto', 1800, 20, 'www.kiwi.com');
// Muestro poroductos
console.log(productManager.getProducts());
// Busco productos por id
productManager.getProductById(1);
productManager.getProductById(4);