let mongoose = require('mongoose')
let viewsSchema = new mongoose.Schema({
    date : {
        type:Date
    },
    ip : {
        type:String
    }
})
module.exports = mongoose.model('Views',viewsSchema)
