let mongoose = require('mongoose')

let smsddosSchema = new mongoose.Schema({   
    phone : {
        type:String,
        require:true
    },
    date:{
        type:Date
    }
})

module.exports = mongoose.model('smsddos',smsddosSchema)