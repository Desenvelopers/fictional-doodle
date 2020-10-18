import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://hacktudo:hacktudo@cluster0.qv0zr.mongodb.net/Cluster0?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true  } )

app.use(routes)

app.listen(3333, () => {
  console.log('Server running')
})
