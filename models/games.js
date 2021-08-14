const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  Rank: { type: Number, require: true },
  Name: { type: String, require: true },
  Platform: { type: String, require: true },
  Year: { type: Number, require: true },
  Genre: { type: String, require: true },
  Publisher: { type: String, require: true },
  Global_Sales: { type: Number, require: true },
})

mongoose.model('Games', postSchema)
