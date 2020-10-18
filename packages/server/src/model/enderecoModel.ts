import mongoose from 'mongoose'

// class Endereco {

//     schema: mongoose.Schema = new mongoose.Schema({
//         rua: String,
//         numero: Number,
//         bairro: String,
//         cidade: String,
//         estado: String,
//         cep: Number,
//         complemento: String
//     })

//     model
    
//     buildModel(endereco) {
//         const Model = mongoose.model('Endereco', this.schema)

//         this.model = new Model({
//             bairro: endereco.bairro,
//             cep: endereco.cep,
//             cidade: endereco.cidade,
//             estado: endereco.estado,
//             rua: endereco.rua,
//             numero: endereco.numero,
//             complemento: endereco.complemento
//         })
//     }
// }

const enderecoSchema = new mongoose.Schema({
    rua: String,
    numero: Number,
    bairro: String,
    cidade: String,
    estado: String,
    cep: Number,
    complemento: String,
    idUsuario: mongoose.Types.ObjectId,
    tipoUsuario: String
})


export default mongoose.model('Endereco', enderecoSchema)