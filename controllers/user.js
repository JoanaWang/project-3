// const User = require('../models/user')

async function userProfile(req, res) {
  res.status(200).json(req.currentUser)
}

module.exports = {
  profile: userProfile
}