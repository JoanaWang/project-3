import React from 'react'

import {createCheese} from '../lib/api'
import { toast } from '../lib/notifications'
import CheeseForm from './CheeseForm'

class CheeseNew extends React.Component {
  
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
      const response = await createCheese(this.state.formData)

      toast('Well done, cheese created!')
      this.props.history.push(`/cheeses/${response.data._id}`) // Send the user straight to the new cheese page based on the id that we got from the request response

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
          <CheeseForm
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Make my Cheese" // Can send different text to the button depending on what I want to use the form for (create or edit)
          />
        </div>
      </section>


    )
  }
}

export default CheeseNew