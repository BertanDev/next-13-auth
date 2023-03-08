import axios from 'axios'

const appServerApi = axios.create({
  baseURL: 'http://localhost:3333',
})

export default appServerApi
