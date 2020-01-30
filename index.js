
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const database = require('./src/database');
var users = require('./src/models/users');
var days = require('./src/models/days');
var Views = require('./src/models/view')
var reserves = require('./src/models/reserves');
var jwtDecode = require('jwt-decode');

const cors= require('cors');
app.use(cors());
app.options('*', cors());
app.use(expressJwt({secret: 'beyragh-app-super-shared-secret',credentialsRequired: false}).unless({path: ['/api/view/set','/api/admin/login','/api/sms/send','/api/sms/verify','/api/days/all']}));
app.use(bodyParser.json());
app.use(require('./src/models/router'));



app.listen(3000, () => console.log('server on!'));