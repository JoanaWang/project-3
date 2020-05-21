import React from 'react'

import { loginUser } from '../lib/api'
import { setToken } from '../lib/_auth'
import { toast } from '../lib/notifications'

class Login extends React.Component {


 
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    error: ''
  }


handleChange = (event) => {

  const formData = {...this.state.formData, [event.target.name]: event.target.value}
  this.setState({formData, error:''}) //The moment the user starts typing again, set the error to falsey so that the red highlight turns off

}


// We shouldn't store the authenticated token in state
// For that we can use cookies or local storage (for temp usage) where we can store a key value pair in the browser NOT THE APP.
// Then when we want to do a subsequent action in the browser, we can retrieve it from local storage
// To handle moving tokens around we are going to write _auth.js library

handleSubmit = async (event) => {
  event.preventDefault()

  try {
    // Try to log in so that we get the response from the authentication in order to get the token
    const response = await loginUser(this.state.formData)

    // Store the token in local storage
    setToken(response.data.token)

    // Show toast to welcome back the user

    toast(response.data.message)

    // Once the user logs in successfully, taken them to the main cheeses page
    this.props.history.push('/cheeses')

  } catch(err) {
    console.log(err.response.data)
    this.setState({error: 'Invalid Credentials'})
  }

}


render() {
  const { formData, error } = this.state
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${error ? 'is-danger' : '' }`}
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
                  className={`input ${error ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={formData.password}
                />
              </div>
              {error && <small className="help is-danger">{error}</small>}
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-warning">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
}

export default Login




// Cybersecurity nice to knows
// https://haveibeenpwned.com/
// https://howsecureismypassword.net/

