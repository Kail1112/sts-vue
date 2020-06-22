import {constants} from '../../utils'

import {Connect} from './'

export default class Category extends Connect {
  // getCatalog - получение товаров из каталога
  getCatalog (resource_id) {
    return this.sendRequest(constants.url.catalog, 'get', { resource_id })
  }
}
