const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function(ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}


const createIntern = async function(req, res) {
    try {
        let data = req.body
        if (!isValidRequestBody(data)) {
            res.status(400).send({ status: false, message: 'please provide intern detail' })
        }

        const { name, email, mobile, collegeId, collegeName } = data //object destructing

        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'please provide name' })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'please provide email' })
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: 'email should be a valid email address' })
            return
        }


        const isEmailAlreadyUsed = await internModel.findOne({ email });

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} email is already registered` })
            return
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: 'please provide mobile no.' })
            return
        }

        if (!isValid(collegeId)) {
            res.status(400).send({ status: false, message: 'college id is required' })
            return
        }

        if (!isValidObjectId(collegeId)) {
            res.status(400).send({ status: false, message: '${collegeId} is not a valid collegeId' })
            return
        }




        let result = await internModel.create(data)
        res.status(201).send({ msg: "successfully created", data: result })


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}

const getInterns = async function(req, res) {
    try {

        let shortName = await collegeModel.findOne({ name: req.query.name, isDeleted: false })
        console.log(shortName)
        if (!shortName) {
            res.status(400).send({ status: false, msg: " college not  found" })
        } else {
            let ID = shortName._id
            let data = shortName
            let interns = await internModel.find({ collegeId: ID, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
            if (!interns.length > 0) {
                return res.status(400).send({ status: false, msg: "inters are not available" })
            } else {
                let details = { name: data.name, fullname: data.fullName, logolink: data.logoLink, interests: interns }
                return res.status(200).send({ status: true, data: details, msg: "succesfully fetched" })
            }
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}





module.exports.createIntern = createIntern;
module.exports.getInterns = getInterns;