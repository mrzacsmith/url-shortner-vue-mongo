const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`** MongoDB connected: ${connect.connection.host}`.america)
  } catch (error) {
    console.error(colors.red(error))
    process.exit(1)
  }
}

module.exports = connectDB
