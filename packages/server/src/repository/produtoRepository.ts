import produtoModel from "../model/produtoModel";

class ProdutoRepository extends produtoModel {
    async getProdutoHashByIdTransporte( idTransporte ) {
        return await produtoModel.findOne( { 'idTransporte': idTransporte}, 'hashProduto' ).exec()
    }
}

export default ProdutoRepository