const Days = require('../src/models/days');
var jwtDecode = require('jwt-decode');

module.exports = {
    
    create : async(req,res) =>{
        var token = jwtDecode(req.headers.authorization)
        if (token.username=="admin" && token.password=="Ali110121!"){
        const {name,capacity,date} = req.body;
        Days.create({
            name,
            capacity,
            date
        },function(err,ress){
            if (err) return res.send(err)
            return res.send(ress)
        })
    }
    else {
        return res.sendStatus(401)
    }
    },
    get : async(req,res)=> {
        Days.find({},function(err,ress){
            if (err) return res.send(err)
            return res.send(ress)
        })
    }
}