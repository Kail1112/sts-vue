const findRoot = (el) => {
  if (!el.parent.hasOwnProperty('$root')) findRoot(el.parent)
  else return el.parent
}

export default findRoot
