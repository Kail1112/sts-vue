import Vue from 'vue'

export function spaceBetweenNumber(data) {
    if (data) return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return "";
}

const filters = {spaceBetweenNumber};

export default filters

for (const key in filters) {
  if (filters.hasOwnProperty(key)) {
    Vue.filter(key, filters[key])
  }
}
