const Users = require('../src/models/users');
var jwtDecode = require('jwt-decode');

module.exports = {
    // create : async(req,res) =>{
    //     const {phone} = req.body;
    //     Users.create(
    //         {phone
    //     },function(err,ress){
    //         if (err) return res.send(err)
            
    //         return res.send(ress)
    //     })

    // },
    get_user : async(req,res) => {
        var token = jwtDecode(req.headers.authorization)
        Users.findOne({"phone":token.phone},function(err,ress){
            if (err) return res.send(err)
            return res.send(ress)
        })
       
        
    },
    get_all : async(req,res) => {
        var token = jwtDecode(req.headers.authorization)
        if (token.username == "admin" && token.password=="Ali110121!"){
        Users.find({}).exec(function(req,resu){
            if (err) return res.send(err)
            return res.send(resu)      
        })
    }
    else {
        return res.sendStatus(401)
    }
    }
}