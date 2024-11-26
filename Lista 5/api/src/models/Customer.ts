import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const CustomerSchema = new Schema({
    sequenceIdCustomer: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    socialName: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pets: [{
        type: Number,
        ref: 'Pet'
    }],
    services: [{
        type: Object,
        ref: 'CustomerService'
    }],
    products: [{
        type: Object,
        ref: 'CustomerProduct'
    }]
}, {
    collection: 'customers',
});

CustomerSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdCustomer' });
const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer
