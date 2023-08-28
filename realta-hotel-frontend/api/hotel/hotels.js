import axios from "../config"

// const get = () => {

//   return axios.get("/hotels")
// }
const get = offset => {
  return axios.get(`/hotels/pagination/${offset}`)
}

const getOne = id => {
  return axios.get(`/hotels/${id}`)
}

const getByHotelName = payload => {
  // console.log(payload)
  return axios.get(
    `/hotels/pagination/${payload.paginationLocation}/${payload.search}`
  )
}

const searchAddress = addr => {
  return axios.get(`/hotels/address/${addr}`)
}

const getAddress = addr_id => {
  return axios.get(`/hotels/addressinfo/${addr_id}`)
}

const getprovinces = () => {
  return axios.get(`/hotels/provinces`)
}

const getLocationCity = payload => {
  return axios.get(`/hotels/location/${payload.prov_id}`)
}

const getLocationCityDistrict = payload => {
  return axios.get(`/hotels/location/${payload.prov_id}/${payload.city_id}`)
}

const createAddress = payload => {
  console.log(payload)
  return axios.post("/hotels/create-address", payload)
}

const create = data => {
  return axios.post("/hotels", data)
}
const update = payload => {
  console.log(payload)
  return axios.patch(`/hotels/${payload.id}`, payload.data)
}
const remove = id => {
  return axios.post(`/hotels/${id}`)
}

const ApiMethod = {
  get,
  getOne,
  create,
  update,
  createAddress,
  searchAddress,
  getAddress,
  remove,
  getByHotelName,
  getprovinces,
  getLocationCity,
  getLocationCityDistrict,
}

export default ApiMethod
