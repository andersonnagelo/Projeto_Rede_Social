let mongoose = require ('mongoose');
module.exports = function (){
    let schema = mongoose.Schema({
        texto: {
            type: String,
            required: true
        },
        likes:{
            type: Number,
            required: true
        },
        usuarioId:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
            required: true
        }
    });
    return mongoose.model('Post', schema)
}();