import React from 'react'
import { Link } from 'react-router-dom'

const CheeseCard = ({ name, image, origin, _id}) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/cheeses/${_id}`}>
    <div className="card">
      <div className="card-header">
        <h4 className="card-header-title">{name}</h4>
      </div>
      <div className="card-image">
        <figure className="image image is-1by1">
          <img src={image} alt={name} loading="lazy" width="255" height="255" />
        </figure>
      </div>
      <div className="card-content">
        <h5 className="">{origin}</h5>
      </div>
    </div>
    </Link>
  </div> 
)
export default CheeseCard