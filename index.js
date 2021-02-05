const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Short url',
//   })
// })
// app.get('/:id', (req, res) => {
//   // TODO: redirect url
// })
// app.post('/url', (req, res) => {
//   // TODO: create a short url
// })
// app.get('/url/:id', (req, res) => {
//   // TODO: get a short url by id
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
