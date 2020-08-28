import axios from 'axios'

const CONFIG_API = {
  BASE_URL: 'https://draliatest.azurewebsites.net/api/availability'
}

const API = {
  slots: {
    getWeekly (date) {
      return axios.get(`${CONFIG_API.BASE_URL}/GetWeeklySlots/${date}`)
    },
    book (payload) {
      return axios.post(`${CONFIG_API.BASE_URL}/BookSlot/`, payload)
    }
  }
}

export default API
