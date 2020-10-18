import enderecoModel from '../model/enderecoModel'

class EnderecoRepository extends enderecoModel {
    async getIdUserByCityAndType( tipoUsuario, cidade ) {
        console.log(tipoUsuario, cidade)
        return await enderecoModel.findOne( { cidade: cidade, tipoUsuario: tipoUsuario }, 'idUsuario' )        
    }
}

export default EnderecoRepository