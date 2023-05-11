const socketClient = io();

const form = document.getElementById('form')
const inputProduct = document.getElementById('product')
const inputPrice = document.getElementById('price')
const list = document.getElementById('article__list_ul')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = inputProduct.value
    const price = inputPrice.value
    socketClient.emit('newProduct', { title: title, price: price })
    alert('Product added!')
})

socketClient.on('arrayProducts', (arrayProducts) => {

    arrayProducts.map(product => {
        let li = document.createElement('li')
        li.innerText = `${product.title} - PRICE: $${product.price}`
        list.appendChild(li)
    })

})

socketClient.on('arrayNewProduct', (lastProduct) => {
    let li = document.createElement('li')
    li.innerText = `${lastProduct.title} - PRICE: $${lastProduct.price}`
    list.appendChild(li)
})

