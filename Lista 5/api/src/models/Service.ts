import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const ServiceSchema = new Schema({
  sequenceIdService: {
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
  }
}, {
  collection: 'services'
});

ServiceSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdService' });
const Service = mongoose.model('Service', ServiceSchema);

export default Service
