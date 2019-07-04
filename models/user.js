const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  auth0_id: { type: String, unique: true },
  recipes: Array,
  meal_plans: Array,
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
