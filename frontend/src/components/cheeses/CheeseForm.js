import React from 'react'

const CheeseForm = ( { formData, handleChange, handleSubmit, buttonText }) => (


// If we want to console.log anythin in a dumb component, we need to use the curly brackets with explicit return so that we can print above the return, like so:

// const CheeseForm = ( { formData, handleChange, handleSubmit, buttonText }) => {
//   console.log('something')
//   return (
//     ...
//   )
// }




  <div className="columns">
    <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            placeholder="Name"
            name="name"
            value={formData.name}
            />
        </div>
      </div>
      <div className="field">
        <label className="label">Origin</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            placeholder="Origin"
            name="origin"
            value={formData.origin}
            />
        </div>
      </div>
      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            placeholder="Image"
            name="image"
            value={formData.image}
            />
        </div>
      </div>
      <div className="field">
        <label className="label">Tasting Notes</label>
        <div className="control">
          <textarea
            onChange={handleChange}
            className="textarea"
            placeholder="Tasting Notes..."
            name="tastingNotes"
            value={formData.tastingNotes}
            />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-fullwidth is-warning">{buttonText}</button>
      </div>
    </form>
  </div>
)

export default CheeseForm