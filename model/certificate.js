const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
name: String,
image: String
})

module.exports = mongoose.model('Certificate', certificateSchema)