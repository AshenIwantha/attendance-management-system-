const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    cardNo: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        required: true,
        type: String,
    },
    time: {
        type: String
  },
  signIn: {
    type: Boolean
},
})

const User = mongoose.model('User', userSchema)

module.exports = User
