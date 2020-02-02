const Codes = require('../src/models/codes');
const Users = require('../src/models/users');
const Smsddos = require('../src/models/sms-ddos');
const Reserves = require('../src/models/reserves');
const request = require('request');
const dateDiff = require('date-diff');
const jwt = require('jsonwebtoken');

module.exports = {
    send_code: async (req, res) => {
        code = Math.floor(1000 + Math.random() * 9000);
        date = Date.now();
        const { phone } = req.body
        console.log(phone)
        Users.findOne({ phone }, function (erruf, resuf) {
            if (erruf) return res.send(erruf)
            if (resuf != null) {
                // console.log(resuf._id)
                Reserves.findOne({"user":resuf._id}, function (errru, resru) {
                    if (errru) res.send(errru)
                    else if (resru != null) {
                        //console.log(resru)
                        console.log("exists")

                        return res.send({res:"reserves"})
                    }
                    else if (resru == null){

                        Smsddos.findOne({ phone }, {}, { sort: { 'date': -1 } }, function (errds, resds) {
                            if (resds != null) {
                                var diff = new dateDiff(Date.now(), resds.date)
                                if (diff.seconds() > 60) {
                                    console.log("code is : " + code)
                                    //////////////////
                                    options = { upsert: true, new: true, setDefaultsOnInsert: true };
                                    Codes.findOneAndUpdate({ phone }, { code, date }, options, function (err, ress) {
                                        if (err) return
                                        request.get(`https://api.kavenegar.com/v1/$$$$$$$$$$$$$$/verify/lookup.json?receptor=${phone}&token=${code}&template=odoo`, (errr, ress, bodyr) => {
                                            if (errr) return res.send(errr)
                                            Smsddos.create({ phone, date }, function (errsms, ressms) {
                                                if (errsms) return errsms;
                                                return ressms
                                            })
                                            return res.send({res:"ok"})
                                        })
                                    })
                                    ///////////////////
                                }
                                else {
                                    return res.send({res:"wait"})
                                }
                            }
                            else {
                                options = { upsert: true, new: true, setDefaultsOnInsert: true };
                                Codes.findOneAndUpdate({ phone }, { code, date }, options, function (err, ress) {
                                    if (err) return
                                    request.get(`https://api.kavenegar.com/v1/$$$$$$$$$6/verify/lookup.json?receptor=${phone}&token=${code}&template=odoo`, (errr, ress, bodyr) => {
                                        if (errr) return res.send(errr)
                                        Smsddos.create({ phone, date }, function (errsms, ressms) {
                                            if (errsms) return errsms;
                                            return ressms
                                        })
                                        return res.send({res:'ok'})
                                    })
                                })
                            }
                        })
                    }
                })
            }
            else{
                options = { upsert: true, new: true, setDefaultsOnInsert: true };
                Codes.findOneAndUpdate({ phone }, { code, date }, options, function (err, ress) {
                    if (err) return
                    request.get(`https://api.kavenegar.com/v1/32$$$$504444446/verify/lookup.json?receptor=${phone}&token=${code}&template=odoo`, (errr, ress, bodyr) => {
                        if (errr) return res.send(errr)
                        Smsddos.create({ phone, date }, function (errsms, ressms) {
                            if (errsms) return errsms;
                            return ressms
                        })
                        return res.send({res:'ok'})
                    })
                })
            }
        })

    },
    verify_code: async (req, res) => {
        console.log("verifications")
        const { phone, code } = req.body
        console.log({ phone })
        var token = jwt.sign({ phone }, 'beyragh-app-super-shared-secret', { expiresIn: '15s' })
        Codes.findOne({ "phone": phone }, function (errn, resn) {
            if (errn) return res.sendStatus(401);
            Users.findOne({ "phone": phone }, function (erru, resu) {
                if (resu == null) {
                    if (resn.code == code) {
                        Users.create({ phone }, function (errsn, ressn) {
                            if (errsn) res.send(errsn)
                            //res.send(ressn)

                            return res.send({ token })
                        })
                        Codes.deleteOne({ phone }, function (errd, resd) {
                            if (errd) return false
                            console.log(resd)
                        })
                    }
                    else {
                        // res.send("Wrong Code")
                        return res.sendStatus(401);
                    }


                } else {
                    if (code != null) {
                        if (resn.code == code) {
                            //res.send("ok")
                            return res.send({ token })
                            Codes.deleteOne({ phone }, function (errd, resd) {
                                if (errd) return false
                                console.log(resd)
                            })
                        }
                        else {

                            //  res.send("Wrong Code")
                            return res.sendStatus(401)

                        }
                    }
                    else {
                        return res.sendStatus(401)

                    }
                }
            })
        })

    }
}
