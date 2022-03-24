const mongoose = require('mongoose')
const validator = require('validator')

const mobileValidation = function(mobile) {
    let regexForMobile = /^[6-9]\d{9}$/
    return regexForMobile.test(mobile)
}




const internSchema = new mongoose.Schema({

    name: {

        type: String,
        unique: true,
        required: 'intern name required'
    },
    email: {
        type: String,
        required: [true, "email is required"],
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: [true, "this email is already used"]
    },

    mobile: {
        type: Number,
        required: [true, "mobile number is required"],
        unique: [true, "this mobile number is already used"],
        validate: [mobileValidation, "please enter a valid mobile number"],
        trim: true

    },


    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "college",
        //required: "college name is required"

    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('intern', internSchema)