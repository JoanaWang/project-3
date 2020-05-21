const User = require('../models/user') // This will fetch the currentUser from the req in user.js
const { notFound } = require('../lib/errorMessages')

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdPlants')
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  profile: userProfile
}
