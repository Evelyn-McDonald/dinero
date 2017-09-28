var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, index: true },
    password: String,
    name: String,
    role: {
        type: Number,
        enum: [1, 2, 3]
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('User', userSchema)
