const collegeModel = require("../models/collegeModel")

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const createCollege = async function(req, res) {
    try {

        let data = req.body
        if (!isValidRequestBody(data)) {
            res.status(400).send({ status: false, message: 'Please enter college details' })
            return
        }

        const { name, fullName } = data; // object destructing

        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'name is required' })
            return
        }

        if (!isValid(fullName)) {
            res.status(400).send({ status: false, message: 'fullname is required' })
            return
        }

        let savedData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: savedData, msg: "succesuflly created" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createCollege = createCollege;