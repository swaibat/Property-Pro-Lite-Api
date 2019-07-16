import { users,propertys } from '../data/data';
import client from '../services/db';
class User {
  constructor(firstName, lastName, email, address, phoneNumber, password,isAgent ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.isAgent = isAgent;
    this.password = password;
  }
  createUser() {
    const userQuery = 'INSERT INTO users(firstName,lastName,email,address,phoneNumber,password,isAgent) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
    const values = [this.firstName, this.lastName, this.email, this.address, this.phoneNumber, this.password, this.isAgent];
    return client.query(userQuery, values);
  }
  static getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    return client.query(query, values);
  }
  
  static allProperty(){
    return propertys
  }
}

class Agent extends User {
  
  static createProperty(property){
    propertys.push(property);
  }

  static updateProperty(property,price, address, city, state, type, imageUrl){
    property.price = price;
    property.city = city;
    property.address = address;
    property.type = type;
    property.state = state;
    property.imageUrl = imageUrl;
    return property;
  }

  static markPropertySold(property){
    property.status = 'sold';
    return property;
  }

  static deleteProperty(property){
    const findIndex = propertys.indexOf(property);
    propertys.splice(findIndex, 1);
  }
}

export {Agent,User}