const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Games = mongoose.model('Games')

const getPagination = (page, size) => {
  const limit = size ? +size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}

router.get('/games', async (req, res) => {
  let {
    page = 1,
    limit = 10,
    orderBy = 'Rank',
    order = 1,
    search = '',
  } = req.query

  const mysort = { [orderBy]: order }
  let query
  if (search) {
    query = {}
  }
  try {
    const games = await Games.find()
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Games.countDocuments()

    // return response with games, total pages, and current page
    res.json({
      games,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: `Error Occured ${e}` })
  }
})

router.put('/update/:id', (req, res) => {
  Games.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  )
    .then((game) => {
      if (!game) {
        return res.status(404).send({
          message: 'game not found with id ' + req.params.id,
        })
      }
      res.send(game)
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.id,
        })
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.id,
      })
    })
})

module.exports = router
