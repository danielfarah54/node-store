'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

// exports.get = async () => {
//     const res = await Customer.find({}, 'name email password')
//     return res
// }

exports.create = async (data) => {
    let customer = new Customer(data)
    const res = await customer.save()
    return res
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res
}

exports.getById = async (id) => {
    const res = await Customer.findById(id)
    return res
}