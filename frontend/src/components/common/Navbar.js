import React from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, logout } from '../lib/_auth'
import { toast } from '../lib/notifications'

class Navbar extends React.Component{

  // In order to know whether the burger menu has been clicked on or not, we can store it in state as a boolean

  state = {
    isOpen: false
  }

  // Don't have to pass event because I don't need to use any data from it
  // It will fire handleToggle on event regardless of passing event as an argumentor not
handleToggle = () => {
  this.setState({isOpen: !this.state.isOpen})
}


handleLogout = () => {
  logout() // Will delete token from local storage
  toast('See you!!!')
  this.props.history.push("/") // When logged out, redirect to home page
}





/*
Fires only after it's been mounted and it has been updated, will rerun every render after mount

It runs after every update of state so if we reset state inside it - it's dangerous as it causes an infite loop! 

I also need to know what was the previous location in case we've navigated away.
*/

componentDidUpdate(prevProps) {
if (this.props.location.pathname !== prevProps.location.pathname) {
  this.setState({isOpen : false})
}
}


  render () {
    const {isOpen} = this.state

    console.log(this.props)
    
    
    return (
      <nav>
        <div className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Cheesebored
              </Link>
    <span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}> 
    {/* class is-active will show the CSS to render the menu as if it was open clicked on */ }
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
                {/* class is-active will show the CSS to render the menu as if it was open clicked on */ }
              <div className="navbar-end">
                <Link to="/cheeses" className="navbar-item">
                  Cheeses
                </Link>
{/* Don't need to show these if the user is logged in, so we'll switch them off when the user is logged in*/}
                {!isAuthenticated() && <Link to="/register" className="navbar-item">
                  Register
                </Link>}
                {!isAuthenticated() && <Link to="/login" className="navbar-item">
                  Login
                </Link>}
                
                {/* I only want to show this IF the use is logged in, shouldn't allow anyone else to create a new cheese 
                
                To do that conditionally, we can use a trick -> an HTML element is always TRUE therefore when we chain that condition with the isAuthenticated boolean, we create this toggle on/off depending on whether the user is logged in or not
                */}

                { isAuthenticated() && <Link to="/cheeses/new" className="navbar-item">
                  New Cheese
                </Link>}
                {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item">Logout</span>} {/* Also should only show the logout button if the user is logged in*/}

              </div>
            </div>
          </div>
        </div>
      </nav>

    )
  }
}

{ /* I want to pass props to Navbar without having to turn it into a route so  

withRouter is a function from react-router-dom so that we also have access to props even though it's not a route
*/}

export default withRouter(Navbar);
