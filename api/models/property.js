import client from '../services/db';
class Property {
  static getPropertyByOwner(email){
    return client.query(`SELECT * FROM property WHERE owner='${email}'`)
  }

  static checkIfPropertyExist(property){
    return client.query(`SELECT * FROM property WHERE ${property}`)
  }

  static queryAll(query){
      return client.query(`SELECT * FROM property WHERE ${query}`)
    }
}

export default Property;
