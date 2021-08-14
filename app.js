const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = 9000

const { MONGOURI } = require('./keys')
mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to database!')
    }
  }
)

// mongoose.connection.on('connected', () => {
//   console.log('connected')
// })
// mongoose.connection.on('error', () => {
//   console.log('connected')
// })

require('./models/games')

app.use(express.json())
app.use(cors())
app.use(require('./routes/games'))

app.listen(port, () => {
  console.log('listining on ', port)
})
