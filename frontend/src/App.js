import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Notifications, {notify} from 'react-notify-toast'


import Home from './components/common/Home'
import CheeseIndex from './components/cheeses/CheeseIndex'
import Navbar from './components/common/Navbar'
import CheeseShow from './components/cheeses/CheeseShow'
import CheeseNew from './components/cheeses/CheeseNew'
import CheeseEdit from './components/cheeses/CheeseEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Error from './components/common/Error'
import SecureRoute from './components/common/SecureRoute'




// class App extends React.Component {
//   async componentDidMount() {
//     try {
//       const res = await fetch('/api/gardenville')
//       const data = await res.json()
//       console.log(data)
//     } catch(err) {
//       console.log(err)
//     }  
//   }

//   render() {
//     return(
//       <h1>Hello World</h1>
//     )
//   }
// }

// export default App


const App = () => {
  return (
    <BrowserRouter>
      <Notifications />
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/cheeses/:id/edit" component={CheeseEdit}/>
        <SecureRoute path="/cheeses/new" component={CheeseNew}/>
        <Route path="/cheeses/:id" component={CheeseShow}/>
        <Route path="/cheeses" component={CheeseIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;


// react-router-dom will pass props by default to each route
// those props will have special properties and methods that we can then use inside each component

// that object keeps the history of every single 'page' we've been through in an array.
// this.props.history

// Also, there's method goBack and goForward which mimics the backwards and forwards buttons for navigation


// DO NOT SecureRoute the authentication page i.e. Register and Login


