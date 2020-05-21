// Not names api with capital A because it's not a component, it's just a library to help us


import axios from 'axios'

import { getToken} from '../lib/_auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: {Authorization: `Bearer ${getToken()}`}
  }
}



export const getAllPlants = () => {
  return axios.get(`${baseUrl}/plants`)
}

export const getSinglePlant = (id) => {
  return axios.get(`${baseUrl}/plants/${id}`)
}

export const createPlant = (formData) => {
  return axios.post(`${baseUrl}/plants`
  , formData //this is the body of the request
  , withHeaders())} // this is the header of the request with the authentication object included

export const editPlant = (id, formData) => {
  return axios.put(`${baseUrl}/plants/${id}`
  , formData
  , withHeaders())} 

export const deletePlant = (id) => {
  return axios.delete(`${baseUrl}/plants/${id}`,
  withHeaders())
}

export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}