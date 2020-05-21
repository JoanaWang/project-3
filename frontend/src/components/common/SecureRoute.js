// higher order function -> a function that takes a function as an argument (map, filter etc) or gives back a function

// Higher order components ... returns a valid Reach component


import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated, logout} from '../lib/_auth'

// ...rest -> rest operator (kind of opposite of spread operator), we don't know how many parameters we'll receive a few props, this will receive them all and store them in a single variable (same as kwargs in Python)

// rest catches all, ... will respread them again 
// parent to grandchild, pass props down, without even looking at their contents 


const SecureRoute = ({component: Component, ...rest}) => {


// component: Component
// This is destructuring and and aliasing at the same time
// We are going to receive the name of the component as part of props and we are going to rename it with a Capital so we can actually is

// ...rest will pass on ANY props that are submitted i.e. from <SecureRoute path="/cheeses/new" component={CheeseNew}/> in App.js
// Props such as path="/cheeses/new"


 if (isAuthenticated()) // If the user is logged in
 return <Route { ...rest} component={Component} /> //We allow you to route through to wherever the user wanted to go to

 // If it's correct, return the REAL ROUTE as normal

 // Otherwise redirect to the login page using a real React component
 logout() // Delete whatever is in local storage, might as well clear the token and start from fresh
 return <Redirect to="/login"/>

}


// We create the SecureRoute component so we use it AS IF it was a Route so that we can use the same interface structure
// <Route path="/cheeses/new" component={CheeseNew}/>


export default SecureRoute

