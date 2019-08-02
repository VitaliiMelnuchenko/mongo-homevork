const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, min: 5, max: 400, required: true, index: true }, //add text index
  subtitle: { type: String, min: 5 },
  description: { type: String, min: 5, max: 5000, required: true },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  category: { type: String, enum: ['sport', 'games', 'history'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, required: true }
});

module.exports = mongoose.model('Article', ArticleSchema);
