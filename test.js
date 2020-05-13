var value = 'global'

function dynamic () {
  var value = 'dynamic'
  return function () { return value }
}

function static () {
  var value = 'static'
  return function () { return value }
}

console.log(dynamic()())
console.log(static()())
