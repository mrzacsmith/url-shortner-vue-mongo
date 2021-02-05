const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Short url',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
