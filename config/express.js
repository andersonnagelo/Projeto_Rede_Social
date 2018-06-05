let express = require ('express');
let userRouter = require ('../app/routes/user.js');
let postRouter = require ('../app/routes/posts.js');
let bodyParser = require('body-parser');

module.exports = function (){
    let app = express ();
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    userRouter(app);
    postRouter(app);
    return app;
};