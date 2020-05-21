export const setToken = (token) => {
  // We store the key value pair in local storage
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}


export const logout = () => {
  window.localStorage.removeItem('token')
}

// Payload are the contents inside a token

const getPayload = () => {
  const token = getToken() // Get the token out of the browser, whatever is there

  // Just want to know if someone is logged in or not, so a boolean

  if (!token) return false // There is no token therefore not logged in
  
  // The token is made up of several parts separated by a dot
  // A valid token should have 3 parts
  // If it was there...
  const parts = token.split('.')

  if (parts.length < 3) return false // If not 3 parts, not logged in


  // Decode the middle part of the code
  return JSON.parse(window.atob(parts[1])) // a to b will decode bit64 strings
  // Use JSON.parse to return as an object that we can use rather than just a string that looks like an object
}



export const isOwner = (id) => {

  //.sub is a subject key

  const userId = getPayload().sub

  // userId is the id of the current user trying to access something
  // the id we pass to the function is the id of the user who CREATED the cheese
  // If they are the same, then true then the current user is the person who created the cheese
  // Therefore they are allowed to make edits
  return userId == id

}










// Checkout www.jwt.io
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000) // This is unix timestamp
  return now < payload.exp // Check if the token is still valid or it has expired
}

// Close the browser and will still be logged in
// It's only on the client side should not cross over to the server side so it's relatively safe

// Every time we login, the token is valid to a certain amount of time and then it expires
// The token is different but has encrypted the information still relating to my account
// When that is decoded, the identity is revealed and then permissions are checked

