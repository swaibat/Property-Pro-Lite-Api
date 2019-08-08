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
    const IdQuery = 'SELECT * FROM property WHERE owneremail=$1'
    const value = [email];
    return client.query(IdQuery,value )
  }

  static checkIfPropertyExist(ownerEmail,price,address,type){
    const typeQuery = 'SELECT * FROM property WHERE owneremail=$1 and price=$2 and address=$3 and type=$4'
    const values = [ownerEmail,price,address,type]
    return client.query(typeQuery,values)
  }

  static queryAll(query){
    const typeQuery = `SELECT * FROM property WHERE ${query}`
      return client.query(typeQuery)
    }
}

export default Property;
