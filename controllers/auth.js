const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { unauthorized } = require('../lib/errorMessages')
const { secret } = require('../config/environment')

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: ` Welcome ${user.username}` })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    // * find the user by their email
    const user = await User.findOne({ email: req.body.email })
    // * if they dont exist or password doesnt match throw an error
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error(unauthorized)
    }
    // * if its all good, make them a token
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    
    // * send the token to them in response
    res.status(202).json({ 
      message: `Welcome back ${user.username}`,
      token
    })

  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login
}
