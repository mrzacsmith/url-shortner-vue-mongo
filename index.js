const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const yup = require('yup')
const { nanoid } = require('nanoid')

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
// app.get('/url/:id', (req, res) => {
//   // TODO: get a short url by id
// })

const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
})

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body
  try {
    await schema.validate({
      slug,
      url,
    })
    if (!slug) {
      slug = nanoid(5)
    }
    slug = slug.toLowerCase()
    res.json({
      slug,
      url,
    })
  } catch (err) {
    next(err)
  }
})

app.use((error, req, res, next) => {
  if (error.stack) {
    res.status(error.status)
  } else {
    res.status(500)
  }
  res.status(400).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'good' : error.stack,
  })
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
