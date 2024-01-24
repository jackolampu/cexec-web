const { Int32, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  price: {
    type: Decimal128,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['icecream', 'snack', 'waffle w/ icecream', 'waffle', 'coffee','drinks','float','spaerkling'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
  flavour: {
    type: String,
    required: 'This field is required.'
  },
  isAvailable: {
    type: Boolean,
    required: 'This field is required.'
  },
  isSpecial: {
    type: Boolean,
    required: 'This field is required.'
  }
});



module.exports = mongoose.model('menu', menuSchema);