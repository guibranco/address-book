const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = module.exports = mongoose.model('User', Schema)

module.exports.createUser = async (data, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
            data.password = hash
            data.save(callback)
        })
    })
}

module.exports.findByEmail = async (email, callback) => {
    const query = {email}
    return await User.findOne(query, callback)
}

module.exports.findById = async (id, callback) => {
    const query = {_id: id}
    return await User.findOne(query, callback)
}

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err)
            throw err

        callback(null, isMatch)
    })
}

module.exports.serialize = (user) => {
    return {
        id: user.id,
        email: user.email
    }
}
