import React from 'react'
// import axios from 'axios' //3rd party HTTP request
import { getAllCheeses } from '../lib/api'


import CheeseCard from './CheeseCard'

class CheeseIndex extends React.Component {
  
  state = {
    cheeses: []
  }
  
  async componentDidMount() {
    try {
      const response = await getAllCheeses()
      this.setState({cheeses: response.data})
    } catch (err) {
      this.props.history.push('/notfound') 
      // If something went wrong, send them to the went wrong page so at least they know something has happened and they can move on
    }

  }


  render () {
    return (
<section className="section">
  <div className="container">
    <div className="columns is-multiline">
    {this.state.cheeses.map((cheese) => (
        <CheeseCard key={cheese._id} {...cheese}/>
      )
    )}
    </div>
  </div>
</section>

    )
  }
}

export default CheeseIndex