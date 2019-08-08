function queryHandle(object){
    const entries = Object.entries(object)
    let array = new Array()
    for(const [key, value] of entries){
      array.push(`${key}='${value}'`)
    }
    return array.toString().replace(/,/g," and ")
}

function bodyHandle(object){
  const entries = Object.entries(object)
  let array = new Array()
  for(const [key, value] of entries){
    array.push(`${key}='${value}'`)
  }
  return array.toString()
}


export { bodyHandle, queryHandle };
