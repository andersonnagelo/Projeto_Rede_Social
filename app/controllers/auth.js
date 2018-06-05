let bcrypt = require('bcrypt');
let User = require('../models/user');
let tokenjson = require('jsonwebtoken');

module.exports.logar = function(req,res){
    function logar(user){
        if (!bcrypt.compareSync(req.body.senha, user.senha)){
            falhar ();
        }else{
            let token= tokenjson.sign ({user: user}, 'secret');
            res.status(200).json({
                message: "Usuário Logado!",
                token: token,
                usuarioId: user._id
            });
        }
    }
    function falhar(){
        res.status(401).send('Login Inválido!');
    }
    User.findOne({email:req.body.email}).exec().then(logar,falhar);
}
module.exports.verificar = function(req, res, next){
    tokenjson.verify(req.query.token, 'secret', function(erro, decoded){
        if (erro){
            return res.status(401).json({
                title: 'Não autenticado',
                error: erro
            });
        }
        next();
    });
};