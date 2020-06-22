import axios from "axios";

const handlerErrors = (error) => {
  // let result = error.response.data.message
  // if (error.response.data.errors !== undefined) {
  //   (result !== '' || result !== undefined) && ( result = '' )
  //   for (const key in error.response.data.errors) error.response.data.errors.hasOwnProperty(key) && ( result += ` ${error.response.data.errors[key].join(' ')}` )
  // }
  throw new Error(error)
}

export default class Connect {
  #_axios = undefined

  constructor () {
    this.#_axios = axios.create({
      responseType: "json",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendRequest (url = '', method = 'post', params = {}, headers = {}, responseType = 'json', data = {}) {
    return this.#_axios(url, { method, params, headers, responseType, data }).then(res => res).catch(handlerErrors)
  }
}
