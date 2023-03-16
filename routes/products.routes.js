const {Router} = require ('express'); 
const {products} = require ('../productsManager');

const router = Router();            
module.exports = router;              

//Todos los productos
router.get('/', async(req,res) => {
    try {
        const limit = req.query.limit;
        const productos =  await products.getProducts();
        
        console.log(productos)
        if ( limit){
            respuesta =  productos.slice(0,limit)
        } else {
            respuesta = productos;
        }
        res.send(respuesta)
    }catch(error) {
    console.log(error)
}  
});

//Producto por id
router.get('/:pid', (req,res) => {
    const pid = req.params.pid;
    const respuesta = products.getProductsById(pid);
    console.log(respuesta)
    res.send({respuesta})  
  });

//Agregar Producto
router.post('/', (req,res) => {
const {title, description, price, thumbnail, code, stock, status, category} = req.body;
products.addProduct(title, description, price, thumbnail, code, stock, status, category);
res.status(201).json({message: '¡Producto Agregado!'})
})

//Eliminar por Id
router.delete('/:pid', async(req,res) => {
    try{
        const pid = req.params.pid;
        console.log(pid)
        (201).json({message: '¡Producto Eliminado!'})

        }catch(error){
            res.status(401).json({message: '¡No existe el Producto!'})
        }
})