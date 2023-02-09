const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    name: String,
    image: String,
    key: String
})

module.exports = mongoose.model('Certificate', certificateSchema)