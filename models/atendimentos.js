const res = require('express/lib/response');
const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataIsValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteIsValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataIsValida,
                mensagem: 'A data de agendamento deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteIsValido,
                mensagem: 'O nome do cliente deve possuir ao menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
    
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    buscaPorId(res, id) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const atendimento = resultado[0]
                res.status(200).json(atendimento)
            }
        })
    }
}

module.exports = new Atendimento