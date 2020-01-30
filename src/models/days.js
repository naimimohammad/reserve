let mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation');
var DateOnly = require('mongoose-dateonly')(mongoose);
//const JDate = require('jalali-date')(mongoose);

let daysSchema = new mongoose.Schema({
    
    name : {
        type:String,
        require:true,
        
    },
    capacity :{
        type:Number,
        require:true,
        validate:{
            validator: (value) => {
                if (value >= 0) return true
                else return false
            }
        }
    },
    date :{
        type:Date,
        required:true
    }
})
daysSchema.plugin(require('mongoose-beautiful-unique-validation'));
module.exports = mongoose.model('Days',daysSchema)