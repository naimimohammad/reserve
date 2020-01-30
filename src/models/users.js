let mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

let usersSchema = new mongoose.Schema({
    
    phone: {
        type: String,
        required: true,
        unique: true
    }
    

})
usersSchema.plugin(require('mongoose-beautiful-unique-validation'));
module.exports = mongoose.model('Users', usersSchema)