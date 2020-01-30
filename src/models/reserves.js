let mongoose = require('mongoose');
const Days = require('./days');
const users = require('./users');
const beautifyUnique = require('mongoose-beautiful-unique-validation');





let reservesSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
        unique: true,
        },
    numberOfSits: {
        type: Number,
        require: true,
        validate: {
            isAsync: true,
            validator :function(value,callback){
                console.log(value)
                if (value < 6) {
                    console.log(this.day)
                    Days.findOne({'_id':this.day}, function (err, res) {
                        if(err) throw err;
                        console.log(res)
                        callback(res.capacity>=value)
                    })
                }
                else  return false  
            }
        }
    },
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Days",
        require: true,
       
    },
    dateofreserve :{
        type:Date,
    }
    

});
reservesSchema.pre('save',function(next){
    this.dateofreserve = Date.now()
    next();
});
reservesSchema.post('save',function(){
    cap = -Math.abs(this.numberOfSits)
    Days.findByIdAndUpdate(this.day,{$inc:{'capacity':cap}},function(err,res){
        if (err) console.log(err)
        
    })
});
reservesSchema.plugin(require('mongoose-beautiful-unique-validation'));
module.exports = mongoose.model('Reserves', reservesSchema)