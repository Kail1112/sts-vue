/**
 * @param {Function} func
 * @return {String}
 * */

const createResponse = (func) => `self.onmessage = event => { const args = event.data; if (args) { (${func}).call(null, self, args) } }`;

/**
 * @param {Function} func
 * @param {Window} window
 * */

const createWorker = (func, window) => {
  if (window) {
    const worker = window.Worker || Worker
    const checkWorker = worker ?? false
    if (checkWorker !== false) {
      const url = window.URL || window.webkitURL
      const res = createResponse(func)
      const blob = new Blob([res],{type:"application/javascript"})
      const link = url.createObjectURL(blob)
      return new Worker(link)
    } else return undefined
  } else return undefined
}

export default createWorker
