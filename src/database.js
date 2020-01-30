let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'beyragh';      // REPLACE WITH YOUR DB NAME
class Database {
    constructor() {
      this._connect()
    }
    
  _connect() {
       mongoose.connect(`mongodb://${server}/${database}`,{ useUnifiedTopology: true ,useNewUrlParser: true, useFindAndModify: false})
         .then(() => {
           console.log('Database connection successful')
         })
         .catch(err => {
           console.error('Database connection error')
         })
    }
  }
  
  module.exports = new Database()