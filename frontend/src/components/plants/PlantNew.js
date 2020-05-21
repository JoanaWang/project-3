import React from 'react'

import {createPlant} from '../lib/api'
import { toast } from '../lib/notifications'
import PlantForm from './PlantForm'

class PlantNew extends React.Component {
  
  state = {
    formData: {
      name: '',
      origin: '',
      image: '',
      tastingNotes: ''
    }
  }
  
  handleChange = (event) => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value}
    this.setState({ formData })
  }


  handleSubmit = async (event) => {
    event.preventDefault()

    // Once we've captured the data we can send it off through the API
    console.log('submitting')  

    try {
      const response = await createPlant(this.state.formData)

      toast('Well done, plant created!')
      this.props.history.push(`/plants/${response.data._id}`) // Send the user straight to the new plant page based on the id that we got from the request response

    } catch(err) {
      console.log(err) 
      //Not necessarily fatal errors, so will make error handling more intricate to help guide the user on what needs fixing
    }

  }


  render () {

    console.log(this.state)

    return(
      <section className="section">
        <div className="container">
          <PlantForm
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Make my Plant" // Can send different text to the button depending on what I want to use the form for (create or edit)
          />
        </div>
      </section>


    )
  }
}

export default PlantNew