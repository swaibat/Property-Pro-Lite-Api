import bcrypt from 'bcrypt';

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

function postHandle(req){
  if(req.url === '/users/auth/signup'){
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }else{
    req.body.owner = req.user.email
  }
  const entries = Object.entries(req.body)
  let keys = []
  let values = []
  for(const [key, value] of entries){
    keys.push(key)
    values.push(value)
  }
  if(req.url === '/users/auth/signup'){
    return { keys:keys.toString().replace(/'/g,""),values:values, token:req.token }
  }
  return { keys:keys.toString().replace(/'/g,""),values}
}


export { bodyHandle, queryHandle,postHandle};
