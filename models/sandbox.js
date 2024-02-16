

const mongoose = require('mongoose');

const sandboxSchema = new mongoose.Schema({
  code: { type: String, required: true },
  output: { type: String, required: true },
  language: { type: String, required: true },
  userId:{ type: String, required: true }
});

const Sandbox = mongoose.model('Sandbox', sandboxSchema);

module.exports = Sandbox;
