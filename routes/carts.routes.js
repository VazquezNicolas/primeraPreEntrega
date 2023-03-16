const {Router} = require ('express');
const {cart} = require ('../productsManager');
const {products} = require ('../productsManager');

const router = Router();              
module.exports = router;                

router.post('/', (req,res) => {
    cart.addCart();

    res.status(201).json({message: 'Nuevo Carrito Agregado!'})
})

router.get('/:cid', (req,res)=> {
    const cid = req.params.cid;
    const respuesta = cart.getProductsById(cid);
    res.send({respuesta})  
})

router.post('/:cid/product/:pid', (req,res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const respuestaCart = cart.getProductsById(cid);
    const respuestaProd = products.getProductsById(pid);

    // console.log({respuestaCart})
    // console.log({respuestaProd})

    if ((respuestaCart != 0) && (respuestaProd != 0)){
            cart.addProductToCart(respuestaCart,respuestaProd.id,quantity=0);
            res.send("Se agrego el producto al carrito")
    }else if (respuestaCart == 0){
        res.send("No se encontro id del carrito")
    }else if (respuestaProd == 0){
        res.send("No se encontro id del Producto")
    }
})

router.get('/', (req,res) => {
    res.json({message: "Carrito de compras"});
})