import mongoose from "mongoose"
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const CustomerProductSchema = new Schema({
  sequenceIdCustomerProduct: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  customer: {
    type: Number,
    ref: 'Customer',
    required: true
  },
  product: {
    type: Number,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  collection: 'customer_products'
});

CustomerProductSchema.index({ customer: 1, product: 1 }, { unique: true });

CustomerProductSchema.pre('validate', async function (next) {
  if (this.isModified('quantity') || this.isModified('product')) {
    try {
      const Product = mongoose.model('Product');
      const productData = await Product.findOne({ sequenceIdProduct: this.product });
      if (!productData) {
        throw new Error('Produto não encontrado');
      }
      this.total = productData.price * this.quantity;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


CustomerProductSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdCustomerProduct' });
const CustomerProduct = mongoose.model('CustomerProduct', CustomerProductSchema);

export default CustomerProduct
