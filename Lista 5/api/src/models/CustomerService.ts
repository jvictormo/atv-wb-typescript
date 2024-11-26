import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const CustomerServiceSchema = new Schema({
  sequenceIdCustomerService: {
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
  service: {
    type: Number,
    ref: 'Service',
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
  collection: 'customer_services'
});

CustomerServiceSchema.index({ customer: 1, service: 1 }, { unique: true });

CustomerServiceSchema.pre('validate', async function (next) {
  if (this.isModified('quantity') || this.isModified('service')) {
    try {
      const Service = mongoose.model('Service');
      const serviceData = await Service.findOne({ sequenceIdService: this.service });
      if (!serviceData) {
        throw new Error('Serviço não encontrado');
      }
      this.total = serviceData.price * this.quantity;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

CustomerServiceSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdCustomerService' });
const CustomerService = mongoose.model('CustomerService', CustomerServiceSchema);

export default CustomerService
