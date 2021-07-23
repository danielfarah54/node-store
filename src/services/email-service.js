'use strict'

const config = require('../config')
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(config.sendgridKey)

exports.send = async (to, subject, body) => {
    try {
        await sendgrid.send({
            to: to,
            from: 'danielfarah@estudante.ufscar.br',
            subject: subject,
            html: body
        })
    } catch (err) {
        console.log(err)
    }
}