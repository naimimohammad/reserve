const Reserves = require('../src/models/reserves');
const Days = require('../src/models/days');
const USers = require('../src/models/users');
var jwtDecode = require('jwt-decode');
const request = require('request');
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
});
function sms(phone,day,num,callback){
    console.log(day)
    api.VerifyLookup({
        receptor:phone,
        token:num,
        token10:day,
        template:'reserve'
    },(err,res)=>{
       // console.log(res)
        if (err) callback(err)
        callback(res)
    })

}
module.exports = {
    create: async (req, res) => {
        var token = jwtDecode(req.headers.authorization)
     //   console.log(req.body.res_day)

        USers.findOne({ "phone": token.phone }, function (err, resu) {
            if (resu != null) {
               // console.log(resu)
               // console.log(req.body)
                user = resu._id
                day = req.body.res_day.day
                numberOfSits = req.body.res_day.num
                Reserves.create({
                    user,
                    numberOfSits,
                    day
                }, function (errr, resr) {
                    console.log(resr)
                    if (errr) return res.send(errr)
                    Reserves.findOne({ "user": user })
                        .populate('day')
                        .exec(function (errsms, ressms) {
                            //console.log("sms nahaee")
                            console.log(ressms)
                            sms(token.phone,ressms.day.name,numberOfSits,function(errsf,ressf){
                                console.log(ressf)
                                if (errsf) console.log(errsf)
                            })
                    
                            return res.send(resr)
                        })

                })
            }
        })
    },
    get_reserve: async (req, res) => {
        var token = jwtDecode(req.headers.authorization)
        userID = req.body.id;
        Reserves.findOne({ 'user': userID }, function (err, ress) {
            if (err) return res.send(err)
            return res.send(ress)
        })
    },

    get_all: async (req, res) => {
        var token = jwtDecode(req.headers.authorization)
        if (token.username == "admin" && token.password == "Ali110121!") {
            // Reserves.find({},function(err,ress){
            //     console.log(ress)
            //     if (err) return res.send(err)
            //     for (var i=0 ; i < len)
            //     return res.send(ress)
            // })
            Reserves.find({})
                .populate('day')
                .populate('user')
                .exec(function (err, ress) {
                    console.log(ress)
                    if (err) return res.send(err)
                    return res.send(ress)
                })
        }
        else {
            return res.sendStatus(401)
        }
    }
}