let controller = require ('../controllers/posts.js');
let auth = require('../controllers/auth');

module.exports = function (app){
    app.use('/api/post/', auth.verificar);
    app.post('/api/post', controller.inserirPost);
    app.get('/api/post', controller.listarPosts);
    app.get ('/api/post/:id', controller.procurarPostId);
    app.get('/api/post/:id/usuario', controller.usuarioDoPost);
    app.put('/api/post/:id', controller.modificarPost)
    app.delete('/api/post/:id', controller.deletarPost);
   
}