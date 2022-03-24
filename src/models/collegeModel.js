const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: "name is required",
        trim: true
    },

    fullName: {
        type: String,
        unique: true,
        required: "fullname is required",
        trim: true
    },

    logoLink: {
        type: String,
        required: [true, "LogoLink is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('College', collegeSchema)