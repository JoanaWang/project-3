const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.virtual('createdDinosaurs', {
  ref: 'Dinosaur',
  localField: '_id',
  foreignField: 'user'
})

userSchema
  .set('toJSON', {
    virtuals: true, 
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function(password) { // * <-- a custom method for the user model to validate incoming passowrds of users trying to login against their saved one in the db
  return bcrypt.compareSync(password, this.password)
}

userSchema // * <--- sets virtual field on model called _passwordConfirmation
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema // * <--- runs before (pre) mongos own validations
  .pre('validate', function(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match') // * <--- we can say its not good and reject it, stopping the creation of the user
    }
    next() // * < -- or everything is ok and we allow it to move on with creation
  })

userSchema
  .pre('save', function(next) { // * <--- will run before the model is saved
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) // * hash the password before it is sent to the database
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)
