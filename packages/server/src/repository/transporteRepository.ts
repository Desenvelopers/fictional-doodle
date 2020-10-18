import transporteModel from '../model/transporteModel'

class TransporteRepository extends transporteModel {
    static async getByIdVenda(idVenda){
        return await transporteModel.findOne( { idVenda: idVenda } ).exec()
    }
}

export default TransporteRepository