const fs = require('fs')

class ProductManager {
    constructor () {
        this.products = []
        this.path = path
    }

    addProduct (product) {
        if (product.title === ''
            || product.description === ''
            || product.price === ''
            || product.thumbnail === ''
            || product.code === ''
            || product.stock === '') {
                console.log('Error: Todos los campos son obligatorios')
                return 'Error: Todos los campos son obligatorios'
            }
            
            const productRepeated = this.products.findIndex ( (newProduct) => newProduct.code === product.code)

            if (productRepeated !== -1) {
                console.log('Error: Codigo Repetido')
                return 'Error: Codigo Repetido'
            }

            const newProduct = {
                id: this.products.length +1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            }

            this.products.push(newProduct)
            
            return newProduct
        }

    getProducts () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error al leer los productos:', err)
                    return reject (err)
                }
                if (data === '') {
                    return resolve ([])
                }
            })
        })
    }

    getProductById (id) {
        return this.getProducts()

        .then((products) => {
            const product = products.find((product) => product.id === id)
            return product
        })
        .catch((e) => {
            console.log('Error al obtener los productos', e)
            return e
        })
    }

    updateProduct(id, updateProduct) {
        this.getProducts()
    
        .then((products) => {
            const productIndex = products.findeIndex((product) => product.id === id)
    
            if (productIndex === -1) {
                return
            }
    
            products[productIndex].title = updateProduct.title
            products[productIndex].description = updateProduct.description
            products[productIndex].price = updateProduct.price
            products[productIndex].thumbnail = updateProduct.thumbnail
            products[productIndex].code = updateProduct.code
            products[productIndex].stock = updateProduct.stock
    
            this.saveProducts(products)
            console.log('Nuevo producto guardado')
        })
        .catch((e) => {
            console.log('Error al guardar nuevo producto')
            return e
        })
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id)
        
        if(productIndex === -1) {
            return console.log('Producto no encontrado')
        }
        
        this.prodducts.splice(productIndex, 1)
        this.saveProducts()
        console.log('Producto eliminado')
    }
}

const manager = new ProductManager ()

const product1 = {
    title: 'product1',
    description: 'description1',
    price: 'price1',
    thumbnail: 'thumbnail1',
    code: 'code1',
    stock: 'stock1'
}

manager.addProduct(product1)

const product2 = {
    title: 'product2',
    description: 'description2',
    price: 'price2',
    thumbnail: 'thumbnail2',
    code: 'code2',
    stock: 'stock2'
}

manager.addProduct(product2)

const product3 = {
    title: 'product3',
    description: 'description3',
    price: 'price3',
    thumbnail: 'thumbnail3',
    code: 'code3',
    stock: 'stock3'
}

manager.addProduct(product3)

console.log(manager.getProducts())

const array1 = manager.getProductById(1)
const array2 = manager.getProductById(2)
const array3 = manager.getProductById(3)
const array4 = manager.getProductById(4)

console.log({
    array1,
    array2,
    array3,
    array4
})

manager.deleteProduct(product1)