const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  updated_at: { type: Date, default: Date.now },
  is_public: { type: Boolean, default: true },
  user_id: { type: String },
  ingredients: { type: Array },
  url: { type: String },
  tags: { type: Array },
  title: { type: String },
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Recipe', recipeSchema)
