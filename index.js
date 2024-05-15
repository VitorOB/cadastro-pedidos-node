const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const uuid = require('uuid');

app.use(cors());
app.use(express.json());

const orders = [];

const checkOrders = (req, res, next)=>{

    const {id} = req.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0){ 
        return res.status(404).json("Order not found!");
    }
    req.indexOrder = index;
    req.idOrder = id;
    next()  
}

app.get('/order', (req, res) => {
    console.log('[GET] /order');
     return res.json(orders)
})     

app.get('/order/:id', checkOrders, (req, res) => {
    console.log('[GET:id] /order');
    return res.json(orders[req.indexOrder]);
})

app.post('/order', (req, res) => {
    const {order, clientName, price, status} = req.body;

    const newOrder = {id: uuid.v4(), order, clientName, price, status};

    orders.push(newOrder);

    console.log('[POST] /order');

    return res.status(201).json(orders);
}) 

app.put('/order/:id', checkOrders, (req, res) => {
 
    const {order, clientName, price, status} = req.body;
    const id = req.idOrder;
    const index = req.indexOrder;
    const updateOrder = {id, order, clientName, price, status};

    orders[index]= updateOrder;
    console.log('[PUT] /order');
    return res.json(updateOrder);
})

app.delete('/order/:id', checkOrders, (req, res) => {
    const index = req.indexOrder;
    orders.splice(index, 1);

    console.log('[DELETE] /order');
    return res.status(204).json();
})

app.patch('/order/:id', checkOrders, (req, res) => {
    const index = req.indexOrder;
    orders[index].status = "Pronto";

    console.log('[PATCH] /order');
    return res.json(orders[index]);
})

app.listen(port, () =>{
    console.log(`🚀 Server Started on port ${port}`);
}) 

