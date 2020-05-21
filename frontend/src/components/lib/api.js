// Not names api with capital A because it's not a component, it's just a library to help us


import axios from 'axios'

import { getToken} from '../lib/_auth'

const baseUrl = 'https://cheesebored.herokuapp.com'

const withHeaders = () => {
  return {
    headers: {Authorization: `Bearer ${getToken()}`}
  }
}



export const getAllCheeses = () => {
  return axios.get(`${baseUrl}/cheeses`)
}

export const getSingleCheese = (id) => {
  return axios.get(`${baseUrl}/cheeses/${id}`)
}

export const createCheese = (formData) => {
  return axios.post(`${baseUrl}/cheeses`
  , formData //this is the body of the request
  , withHeaders())} // this is the header of the request with the authentication object included

export const editCheese = (id, formData) => {
  return axios.put(`${baseUrl}/cheeses/${id}`
  , formData
  , withHeaders())} 

export const deleteCheese = (id) => {
  return axios.delete(`${baseUrl}/cheeses/${id}`,
  withHeaders())
}

export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}