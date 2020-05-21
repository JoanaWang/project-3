const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const plantSchema = new mongoose.Schema({
  plantName: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  water: { type: Number, required: true },
  sun: { type: Number, required: true },
  container: { type: String, required: true }
  // comments: [commentSchema], 
  // user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

plantSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Plant', plantSchema)
