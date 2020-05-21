import React from 'react'
import { Link } from 'react-router-dom'
import { getSinglePlant, deletePlant } from '../lib/api'
import {isOwner} from '../lib/_auth'


class PlantShow extends React.Component {


  state = { plant: null }


  // Every single route will get passed props because of react-router-dom
  async componentDidMount() {
    try {
      const plantId = this.props.match.params.id
      const res = await getSinglePlant(plantId)
      this.setState({ plant: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/notfound') 
      // If something went wrong, send them to the went wrong page so at least they know something has happened and they can move on
    }
  }



handleDelete = async () => {
  try {
    const plantId = this.props.match.params.id
    await deletePlant(plantId)
    this.props.history.push('/plants')
  } catch (err) {
    console.log(err)
  }
}




  render() {
    if (!this.state.plant) return null
    const { plant } = this.state
    return (
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">{plant.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={plant.image} alt={plant.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4"><span role="img" aria-label="plate">🍽</span> Tasting Notes</h4>
              <p>{plant.plantName}</p>
              <hr />
              <h4 className="title is-4"><span role="img" aria-label="globe">🌍</span> Origin</h4>
              <hr />
              <p>{plant.description}</p>
              <hr />
              {/* <h4 className="title is-4"><span role="img" aria-label="wave">🖐</span> Added By</h4>
              <hr />
              <p>{plant.user.username}</p>
              <hr />
              {isOwner(plant.user._id) && <Link to={`/plants/${plant._id}/edit`} className="button is-warning">Edit</Link>}
              <hr />
              {isOwner(plant.user._id) && <button onClick={this.handleDelete} className="button is-danger">Delete</button>} */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default PlantShow



// I can't allow a user to edit using isAuthenticated() because that just means that someone's logged in but not if the it's the OWNER of the plant (the only user allowed to edit)