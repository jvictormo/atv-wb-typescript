import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const ProductSchema = new Schema({
  sequenceIdProduct: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
}, {
  collection: 'products'
});


ProductSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdProduct' });
const Product = mongoose.model('Product', ProductSchema);

export default Product
