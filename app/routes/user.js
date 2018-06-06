let controller = require ('../controllers/user.js');
let auth = require ('../controllers/auth.js');

module.exports = function (app){
    app.post('/api/user/login', auth.logar);
    app.post('/api/user', controller.inserirUsuario);
    app.use('/api/user/', auth.verificar);
    app.get('/api/user', controller.listarUsuarios);
    app.get ('/api/user/:id', controller.procurarUsuarioId);
    app.get('/api/user/posts', controller.postDoUsuario);
    app.put('/api/user/', controller.modificarUsuario);
    app.delete('/api/user/:id', controller.deletarUsuario);
}