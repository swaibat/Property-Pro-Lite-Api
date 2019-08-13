import client from '../services/db';
class Property {
  constructor(price, address, city, state, type, imageUrl,email,phoneNumber) {
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

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
