'use strict'

const { json } = require('body-parser')
const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    let token = await jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'})
    return token
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY)
    return data
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    // console.log(req.headers['x-access-token'])
    if(!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            } else {
                next()
            }
        })
    }
}

exports.isAdmin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            } else {
                if(decoded.roles.includes('admin')) {
                    next()
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita a administradores'
                    })
                }
            }
        })
    }
}