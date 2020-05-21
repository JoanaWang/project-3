import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleCheese, deleteCheese } from '../lib/api'
import {isOwner} from '../lib/_auth'


class CheeseShow extends React.Component {


  state = { cheese: null }


  // Every single route will get passed props because of react-router-dom
  async componentDidMount() {
    try {
      const cheeseId = this.props.match.params.id
      const res = await getSingleCheese(cheeseId)
      this.setState({ cheese: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/notfound') 
      // If something went wrong, send them to the went wrong page so at least they know something has happened and they can move on
    }
  }



handleDelete = async () => {
  try {
    const cheeseId = this.props.match.params.id
    await deleteCheese(cheeseId)
    this.props.history.push('/cheeses')
  } catch (err) {
    console.log(err)
  }
}




  render() {
    if (!this.state.cheese) return null
    const { cheese } = this.state
    return (
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">{cheese.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={cheese.image} alt={cheese.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4"><span role="img" aria-label="plate">🍽</span> Tasting Notes</h4>
              <p>{cheese.tastingNotes}</p>
              <hr />
              <h4 className="title is-4"><span role="img" aria-label="globe">🌍</span> Origin</h4>
              <hr />
              <p>{cheese.origin}</p>
              <hr />
              <h4 className="title is-4"><span role="img" aria-label="wave">🖐</span> Added By</h4>
              <hr />
              <p>{cheese.user.username}</p>
              <hr />
              {isOwner(cheese.user._id) && <Link to={`/cheeses/${cheese._id}/edit`} className="button is-warning">Edit</Link>}
              <hr />
              {isOwner(cheese.user._id) && <button onClick={this.handleDelete} className="button is-danger">Delete</button>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default CheeseShow



// I can't allow a user to edit using isAuthenticated() because that just means that someone's logged in but not if the it's the OWNER of the cheese (the only user allowed to edit)