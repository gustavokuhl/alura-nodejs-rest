module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('voce esta na rota de atendimentos'))
}