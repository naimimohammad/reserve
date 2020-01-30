let mongoose = require('mongoose')

let codesSchema = new mongoose.Schema({
    
    phone : {
        type:String,
        require:true
    },
    code :{
        type:Number
    },
    date:{
        type:Date
    }
})
// codesSchema.pre('save',function(){
//     //this.code = Math.floor(1000 + Math.random() * 9000);
//     this.date = Date.now();
// })
module.exports = mongoose.model('codes',codesSchema)