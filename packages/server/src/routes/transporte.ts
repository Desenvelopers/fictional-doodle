import { Router } from 'express'

import Path from 'path'

import TransporteController from '../controller/transporteController'

const transporteController  = new TransporteController()

const router = Router()

router.post( '/gerarinfos/:idvenda', async (req, res)=> {
    await transporteController.gerarInfos( {
        idVenda: Number(req.params.idvenda),
        compradorReq: req.body.comprador,
        vendedorReq: req.body.vendedor,
        produtoReq: req.body.produto,
        dataDeposito: new Date(req.body.dataDeposito)
    } )
    
    return res.status(200).sendFile(Path.resolve('src/tmp/output.pdf'))

} )

router.post('/inserir/:idvenda', async (req, res) => {
    const transporte = await transporteController.salvarInfosTransporte(  {
        idVenda: Number(req.params.idvenda),
        compradorReq: req.body.comprador,
        vendedorReq: req.body.vendedor,
        produtoReq: req.body.produto,
        dataDeposito: req.body.dataDeposito
    }  )

    return res.status(200).json(transporte)
})



export default router