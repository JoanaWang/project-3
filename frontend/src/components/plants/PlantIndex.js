import React from 'react'
// import axios from 'axios' //3rd party HTTP request
import { getAllPlants } from '../lib/api'


import PlantCard from './PlantCard'

class PlantIndex extends React.Component {
  
  state = {
    plants: []
  }
  
  async componentDidMount() {
    try {
      const response = await getAllPlants()
      this.setState({plants: response.data})
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
    {this.state.plants.map((plant) => (
        <PlantCard key={plant._id} {...plant}/>
      )
    )}
    </div>
  </div>
</section>

    )
  }
}

export default PlantIndex