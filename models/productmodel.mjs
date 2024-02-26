
import mongoose from 'mongoose';


const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
            default: 1
        },
        category: {
            type: String,
        }

    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema, 'product');



export default Product;

