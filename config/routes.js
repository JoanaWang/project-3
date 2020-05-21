const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')
const users = require('../controllers/users')

router.route('/plants')
  .get(plants.index)
  .post(secureRoute, plants.create)

router.route('/plants/:id')
  .get(plants.show)
  .put(secureRoute, plants.update)
  .delete(secureRoute, plants.delete)

router.route('/plants/:id/comments')
  .post(secureRoute,plants.commentCreate)

router.route('/plants/:id/comments/:commentId')
  .delete(secureRoute, plants.commentDelete)

router.route('/profile')
  .get(secureRoute, users.profile)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

module.exports = router
