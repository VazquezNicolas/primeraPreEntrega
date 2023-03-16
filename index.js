const express = require ('express');
const productsRouter = require ('./routes/products.routes');
const cartsRouter = require ('./routes/carts.routes');

const port = 8080;
const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts',cartsRouter);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})
