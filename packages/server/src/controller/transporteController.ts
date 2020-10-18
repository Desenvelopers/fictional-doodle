import Hashids from 'hashids/cjs'
import pdf from 'pdf-creator-node'
import fs from 'fs'

import Transporte from '../model/transporteModel'
import TransporteRepository from '../repository/transporteRepository'

import produtoController from './produtoController'
import Produto from '../model/produtoModel'

import TravellerController from './travellerController'
import EContainerController from './eContarinerController'

interface requestTransporte {
    idVenda: number;
    vendedorReq;
    compradorReq;
    produtoReq;
    dataDeposito: Date
}

const hashids = new Hashids('', 6)

class TransporteController {
    async gerarInfos({ idVenda, compradorReq, vendedorReq, produtoReq, dataDeposito }: requestTransporte) {

        const hashProduto = hashids.encode(idVenda).toUpperCase()
        
        produtoReq.hashProduto = hashProduto

        const produtoQrCode = await produtoController.generateQrcodeByHash(hashProduto)

        await produtoController.insertProduto( produtoReq, idVenda )

        await this.salvarInfosTransporte({ idVenda, compradorReq, vendedorReq, produtoReq, dataDeposito })

        const document = {
            // TODO
            html: "<img src={{url}}>",
            data: {
                url: produtoQrCode,
                // ruaDestinatario: compradorReq.endereco.rua
            },
            path: './src/tmp/output.pdf'
        }

        await pdf.create( document )

        // return transporte
    }

    async salvarInfosTransporte({ idVenda, compradorReq, vendedorReq, produtoReq, dataDeposito }: requestTransporte) {
        const transporte = new Transporte({
            nomeVendedor: vendedorReq.nome,
            nomeComprador: compradorReq.nome,
            hashProduto: produtoReq.hashProduto,
            idVenda: idVenda,
            travellerId: await TravellerController.escolherMelhorViajanteDisponivel(vendedorReq.endereco.cidade, compradorReq.endereco.cidade, dataDeposito),
            eContainerDestinatarioId: await EContainerController.getContainerByCity( compradorReq.endereco.cidade ),
            eContainerRemententeId: await EContainerController.getContainerByCity( vendedorReq.endereco.cidade ),
            dataDeposito: dataDeposito
        })

        return console.log(JSON.stringify(await transporte.save()))
    }
}

export default TransporteController