var mongoose = require('mongoose');

var hospitalSchema = ({
    h_id: {type: Number, required: true},
    name: {type: String, required: true}
    
});

module.exports = mongoose.model('movie', hospitalSchema);