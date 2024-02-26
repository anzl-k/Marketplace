import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './model/productmodel.mjs';

const server = express();
const PORT = 3000;

server.use(cors());
server.use(express.json());

const uri = "mongodb+srv://admin:admin@cluster0.ijpylks.mongodb.net/Marketplace?retryWrites=true&w=majority";

server.get('/', (req, res) => res.send('{"Message":"Welcome to DressStore Application."}'));

server.get('/products', async (req, res, next) => {
    if (req.query.name) {
        try {
            const regex = new RegExp(req.query.name, 'i');
            const products = await Product.find({name: regex});
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    } else {
        next();
    }
});

server.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

server.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

server.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

server.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

server.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

server.delete('/products', async (req, res) => {
    try {

        const products = await Product.deleteMany({});


        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(uri)
  .then(() => {
    console.log('Connected! to mongodb');
    server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
  })
  .catch(error => console.log(error));
