const fs= require('fs')

class ProductManager {
    static id = 1


    constructor (path) {
        this.products = [];
        this.path = path
    }
    
    addProduct(title, description, price, thumbnail, code, stock, status=true, category ) {
        
        const product = ({
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
            id: ProductManager.id
        })
            
        if (this.products !=  undefined){
            
            const chekCode = this.products.find(e => e.code === product.code)

            if (chekCode != undefined) {
                 console.log('error, se a colocado el mismo codigo en un producto distinto')
            //  } else if ( (!product.title ) || (!product.description) || (!product.price ) || (!product.thumbnail ) || (!product.code ) || (!product.stock ) ) {
            //       console.log('todos los campos son obligatorios ')
              } else {
                this.products.push(product)
                console.log("agrego")
                fs.writeFileSync(this.path, JSON.stringify(this.products))
                ProductManager.id++
            }
        }
    }

    getProducts(){
        const data = JSON.parse(fs.readFileSync(this.path), "utf-8")
        console.log(data);
        return data;
    }

    getProductsById(id) {
        let data = fs.readFileSync(this.path,'utf-8')
        
            data = JSON.parse(data)
            let productId = data.find(e => e.id == id)
            if(productId != undefined){
                console.log("\n")
                console.log("Producto con id ["+id+"]")
                console.log(productId)
                return productId;
            }
             else { error();}
        
    }

    deleteProduct = async (id) => {
        try {
            console.log(id+"1")
        let data2 = await fs.promises.readFile(this.path,'utf-8')
            console.log(id+"1")
            data2 = await JSON.parse(data2)
            let productId = await data2.filter(e => e.id != id)
            let errorsito = await data2.some(e => e.id == id)
            console.log(id+"2")

            if (errorsito == false)
            {
                error();
            }else if (productId != undefined) {
                await fs.promises.writeFile(this.path, JSON.stringify(productId))
                data2 = await fs.promises.readFile(this.path,'utf-8')
                .then(data2 => {
                    console.log("\nSe a eliminida el producto")
                    console.log("Productos Restantes:")
                    console.log(data2)
                    return 1;
                    })
                }
        } catch(error) {
                await console.log("\nEl producto no existe")
                return 0;
            }
    }

    updateProduct = async (title, description, price, thumbnail, code, stock, status, category, id) => {
        const product = ({
            id:id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            categoty: category,
        })

        let data = await fs.promises.readFile(this.path,'utf-8')
        
            data = await JSON.parse(data)
            const productId = await  data.filter(e => e.id != id)

            await fs.promises.writeFile(this.path, JSON.stringify(productId))
         
            data = await fs.promises.readFile(this.path,'utf-8')
            .then(data => {
                fs.appendFileSync(this.path, JSON.stringify(product))
                console.log("\nSe a modificado el producto")
                console.log("Productos Actualizado:")
                console.log(data)})
    }
}

const products = new ProductManager('../archivos/products.json');
const cart     = new ProductManager ('../archivos/carts.json');

module.exports = {
    products,
    cart
}



