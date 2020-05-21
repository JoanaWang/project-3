import React from 'react'
import CheeseForm from './CheeseForm'
import { getSingleCheese, editCheese} from '../lib/api'


class CheeseEdit extends React.Component {

  state = {
    formData: {
      name: '',
      origin: '',
      image: '',
      tastingNotes: ''
    }
  }


async componentDidMount() {
  
  const cheeseId = this.props.match.params.id // get id from the url since we already have it/are there

  try{
const response = await getSingleCheese(cheeseId)
this.setState({formData: response.data})
console.log(response)
  } catch(err) {
    console.log(err.response)
    this.props.history.push('/notfound') 
    // If something went wrong, send them to the went wrong page so at least they know something has happened and they can move on
  }
}


  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }
  
  
  handleSubmit = async event => {
    event.preventDefault()
    console.log('ready to send the edited data', this.state.formData)


    const cheeseId = this.props.match.params.id 

    try{
        await editCheese(cheeseId, this.state.formData)
        this.props.history.push(`/cheeses/${cheeseId}`) // once edited redirect to that cheese's page
    } catch(err) {
      console.log(err.response)
    }

}





  render() {
    return (
      <section className="section">
        <div className="container">
          <CheeseForm
            formData={this.state.formData} // This is sending pre-existing data that came from the API request
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Edit my Cheese"
          />
        </div>
      </section>
    )
  }
}


export default CheeseEdit