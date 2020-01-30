
let mongoose = require('mongoose');
const views = require('../src/models/view');
module.exports = {
    viwe : async(req,res) => {
      ip=req.headers['x-forwarded-for']||req.connection.remoteAddress;
      ip=ip.split(':')
      ip=ip[ip.length-1]
      date = new Date().toISOString()
      views.create({ip,date},function(err,resc){
          if (err) return res.send(err)
          return res.send({code:"ok"})
      })
    
    },
    get_num : async(req,res) => {
        views.find({}).exec(
            function(err,resc){
                if (err) return res.send(err)
                return res.send({view:resc.length})
            }
        )
    }
}