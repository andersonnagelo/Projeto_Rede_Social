let Usuario = require('../models/user.js');
let bcrypt = require('bcrypt');
let tokenjson = require('jsonwebtoken');
let Post = require('../models/post');


module.exports.inserirUsuario = function(req,res){
    let user = new Usuario ({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    });
    
    let promise = Usuario.create(user)
    promise.then(
        function(useres){
            res.status(201).json(useres);
        },
        function (erro){
            res.status(500).json({erro});
        }
    );
}
module.exports.listarUsuarios = function(req,res){
    let promise = Usuario.find().exec();
    promise.then(
        function(useres){
            res.json(useres);
        },
        function(erro){
            res.status(500).end();
        }
    );
}
module.exports.procurarUsuarioId = function(req,res){
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function (useres){
            res.json(useres);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.deletarUsuario = function(req, res){
    let payload = tokenjson.decode(req.query.token);
    let promise = Usuario.findByIdAndRemove(payload.usuarioId);
    promise.then(
        function (useres){
            res.status(201).json(useres);
        },
        function (erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.modificarUsuario = function(req, res){
    let payload = tokenjson.decode(req.query.token);
    //req.body.senha = bcrypt.hashSync(req.body.senha, 10);
    let user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    }

    let promise = Usuario.findByIdAndUpdate(payload.usuarioId, {
        $set:user
    }).then(
        function(user){
            res.status(201).json(user);
        },
        function (erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.postDoUsuario = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id);
    promise.then(
        function(user){
            let promise01 = Post.find({'uid': user._id});
            promise01.then(
                function(Post){
                    res.json(Post);
                    console.log('ta entrando');
                },
                function(erro){
                    res.status(500).send();
                }
            )
        }
    );
}

