const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Categoria', categoriaSchema);

/*
let categoriaSchemaJSON = {
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}

let categoria_Schema = new Schema(categoriaSchemaJSON);

module.exports = mongoose.model('Categoria', categoria_Schema);
*/