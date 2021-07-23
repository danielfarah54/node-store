'use strict'

// const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/order-repository')
const guid = require('guid')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.post = async (req, res, next) => {
    // // Validações
    // let contract = new ValidationContract()
    // contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres')
    // contract.isEmail(req.body.email, 'Email inválido')
    // contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 caracteres')

    // // Se os dados forem inválidos
    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end()
    //     return
    // }

    try {
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        // Decodifica o token
        const tokenData = await authService.decodeToken(token)

        let response = await repository.create({
            customer: tokenData.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({ message: 'Pedido realizado com sucesso' })
    } catch (err) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}