const Reserves = require('../src/models/reserves');
const Days = require('../src/models/days');
const Users = require('../src/models/users');
var jwtDecode = require('jwt-decode')
const jwt = require('jsonwebtoken');

module.exports = {
    get_init: async (req, res) => {
        console.log("sdfsdfsdfsfsfsfsfd")
        var token = jwtDecode(req.headers.authorization)
        var Init = {};
        Users.findOne({ phone: token.phone }, function (erru, resu) {
            if (erru) return res.send(erru)
            Init.user_id = resu._id
            Init.user_phone = token.phone
            Reserves.findOne({ 'user': resu._id }, function (errr, resr) {
                if (errr) return res.send(errr)
                if (resr != null) {
                    Init.reserve_id = resr._id
                    Init.day_id = resr.day
                    Init.numSits = resr.numberOfSits
                    Days.findById(resr.day,function(errd,resd){
                        if (errd) return res.send(errd)
                        Init.day_name = resd.name
                        console.log(Init)
                        return res.send({Init})
                    })
                }
            })
        




        })



    },
    verify : async (req,res) => {
        const {username,password} = req.body;
        if (username == "admin" && password == "Ali110121!"){
            var token = jwt.sign({ username,password }, 'beyragh-app-super-shared-secret', { expiresIn: '5h' })
            return res.send({token})
        }
        else {
            console.log("eshtep !!!!")
            return res.sendStatus(401)
        }
    }
}
