const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealPlanSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_public: { type: Boolean, default: false },
  user_id: { type: String },
  title: { type: String },
  plan: []
})

module.exports = mongoose.model('MealPlan', mealPlanSchema)
