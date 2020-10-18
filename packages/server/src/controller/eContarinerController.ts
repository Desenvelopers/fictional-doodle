import EnderecoController from "./enderecoController"
import EContainerModel from "../model/eContainerModel"
import TipoUserContoller from "./tipoUserController"

const enderecoController = new EnderecoController()

class EContainerController {
    static async getContainerByCity( nomeCidade ){
        return await enderecoController.getIdUserByCityAndType( 'C', nomeCidade)
    }

    async insertEContainer( eContainerReq ) {
        const eContainerModel = new EContainerModel({
            nome: eContainerReq.nome,
            cpnj: eContainerReq.cnpj,
            qtdProduto: 0
        })

        await TipoUserContoller.insertType( eContainerModel._id, 'C' )

        await EnderecoController.insertEndereco( eContainerReq.endereco, eContainerModel._id )

        return JSON.stringify( await eContainerModel.save() )
    }
}

export default EContainerController