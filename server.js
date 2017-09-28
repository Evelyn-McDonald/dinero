const Express       = require('express')
const path          = require('path')
const Mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const apiRoutes     = require('./api/routes')

const app           = Express()

let db

require('dotenv').config()

app.use('/dist', Express.static(path.join(__dirname, 'dist')))
app.use('/assets', Express.static(path.join(__dirname, 'dist/assets')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

Mongoose.Promise = global.Promise
Mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }, (err, db) => {
    if (err) throw err

    db = this.db
    console.log('Database connection ready')

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'index.html'))
    })

    app.use('/api', apiRoutes)

    app.listen(process.env.APP_PORT, function () {
      console.log('==> ✅ \t Dinero app listening on port', process.env.APP_PORT)
    })  
})
