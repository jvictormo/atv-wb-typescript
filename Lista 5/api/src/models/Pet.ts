// models/Pet.js

import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

const genderEnum = ['Macho', 'Fêmea', 'Outro'];

const PetSchema = new Schema({
  sequenceIdPet: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: genderEnum,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  owner: {
    type: Number,
    ref: 'Customer',
  }
}, {
  collection: 'pets',
});

PetSchema.plugin(AutoIncrement, { inc_field: 'sequenceIdPet' });
const Pet = mongoose.model('Pet', PetSchema);

export default Pet
