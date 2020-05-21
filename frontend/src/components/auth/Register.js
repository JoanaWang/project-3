import React from 'react'
import { registerUser } from '../lib/api'

class Register extends React.Component {


  // the input name should match the key in state
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {

    }
  }

  // events are attached to the 
  // submission of the form (NOT the button!!!)
  // listeners onChange for each input

handleChange = (event) => {

  // Create a new object, take the old values but overwrite with whatever new values
  // Spread the object so we can update each key at a time

  const formData = {...this.state.formData, [event.target.name]: event.target.value}
  
  // When the user tries again to input the field after it had an error
// So we can reset the errors to a falsey (that's what happens with an empty string) to make the error red highlight to go away because the error in THAT field will be false(y)
  const errors = {...this.state.errors, [event.target.name]: ''}
  
  
  this.setState({formData})

}


// Does exactly the same thing but using double destructuring!!

// handleChange = ({target :{ name, value}}) => {

//   const formData = {...this.state.formData, [name]: value}
//   this.setState({formData})

// }


// This goes on the form tag NOT button tag
// If using fat arrow syntax, async goes just before the function definition:
// i.e. async (event) => {}
// If using a ready-built function, async goes before the funtion callback:
// i.e. async componentDidMount() {}
handleSubmit = async (event) => {
  event.preventDefault()

  try {
    const response = await registerUser(this.state.formData)
    // If the registration goes well, redirect automatically to the login page by adding the login page to the last location
    this.props.history.push('/login')


  } catch(err) {
console.log('This error', err.response.data.errors)
// If it goes wrong, I can store the error messages in state
// The way this API was written, returns the errors in a nice object structure that we can use straight away in state
this.setState({errors : err.response.data.errors})
  }

}


// If the errors object has a key that matches one of the inputs, then it was wrong
// If the user tries to submit something but goes wrong, we can highlight the box with a is-danger class.




// Controlled vs non-controlled components
// Controlled -> React knows everything that is happening in the DOM via state
// i.e. value={this.state.formData.username}
// Non-controlled/Uncontrolled -> Allows changes to be made on screen/on the page that state does not record
// i.e. we don't declare value={this.state.formData.username}, just use event.target.value directly not going via state

  render({ formData, errors } = this.state) 
  
// If we destructure on input, we can just use formData whenever we used to write this.state, just cutting the reference short

  // Same as doing destructuring after
  // const {formData} = this.state
  
  {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input 
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={formData.username}
                  />
                </div>
                {errors.username && <small className="help is-danger">{errors.username}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={formData.passwordConfirmation}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

// <input 
// className={`input ${errors.username ? 'is-danger' : ''}`} {/* If this key happens to be in errors, then it means it was wrong therefore add is-danger class to highlight as red */...}


// {/*If this error exists, show this element to help guide the user*/}
// {errors.username && <small className="help is-danger">{errors.username}</small>}


export default Register