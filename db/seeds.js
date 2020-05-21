const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Plant = require('../models/plant')
const User = require('../models/user')
const plantData = require('./data/plants')
const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)
 
    try {
      await db.dropDatabase()

      const users = await User.create(userData)

      console.log(`${users.length} users created 😃`)

      const plantsWithUsers = plantData.map(plant => {
        return { ...plant, user: users[0]._id }
      })
      
      const plants = await Plant.create(plantsWithUsers)

      console.log(`${'🌱 '.repeat(plants.length)} plants created `)

      await mongoose.connection.close()

      console.log('Goodbye 👋')

    } catch (err) {
      console.log(err)
    }

  })
