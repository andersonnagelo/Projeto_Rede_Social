let post = require('../models/post');
let usuario = require('../models/user');
let bcrypt = require('bcrypt');
let tokenjson = require('jsonwebtoken');

module.exports.inserirPost = function(req,res){
    let promise = post.create(req.body)
    promise.then(
        function(posts){
            res.status(201).json(posts);
        },
        function (erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.listarPosts = function(req,res){
    let promise = post.find().exec();
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}
module.exports.procurarPostId = function(req,res){
    let id = req.params.id;
    let promise = post.findById(id).exec();
    promise.then(
        function (posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.deletarPost = function(req, res){
    let payload = tokenjson.decode(req.query.token);
    let id = req.params.id;
    let promise = post.findById(id);

    promise.then(
        function(Post){
            console.log(Post);
            if(Post.usuarioId == payload.userId){
                let promise01 = post.findByIdAndRemove(id, req.body);
                promise01.then(
                    function (Post) {
                        res.status(201).json(Post);
                    },
                    function (erro){
                        res.status(500).json(erro);
                    }
                )
            } else{
                res.status(500).json(erro);
            }
        }
    );
}

module.exports.modificarPost = function(req, res){
    let payload = tokenjson.decode(req.query.token);
    let id = req.params.id;
    let promise = post.findById(id);

    promise.then(
        function(Post){
            if(Post.usuarioId == payload.userId){
                let promise01 = post.findByIdAndUpdate(id, req.body);
                promise01.then(
                    function (Post){
                        res.status(201).json(Post);
                    },
                    function (erro){
                        res.status(500).json(erro);
                    }
                )
            } else{
                res.status(500).json(erro);
            }
        }
    );
}

module.exports.usuarioDoPost = function(req, res){
    let id = req.params.id;
    let promise = post.findById(id).populate('usuarioId').exec();

    promise.then(
        // function(Post){
        //     let promise01 = usuario.findById(Post.usuarioId);
        //     promise01.then(
                function(useres){
                    res.json(useres);
                },
                function(erro){
                    res.status(500).json(erro);
                }
    )
 }

