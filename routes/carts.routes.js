const {Router} = require ('express');
const {cart} = require ('../productsManager');

const router = Router();              
module.exports = router;                

router.get('/', (req,res) => {
    res.json({message: "Carrito de compras"});
})