var mongoose = require('mongoose');
var schema = mongoose.Schema;

var imageSchema = new schema({
    title: String,
    desc: String,
    path: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = new mongoose.model('Image', imageSchema);