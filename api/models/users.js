import { users,propertys } from '../data/data';

class User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.isAgent = false;
    this.password = password;
  }

  static getUserByEmail(email){
    return users.find(u => u.email === email)
  }
  static getUserByID(id){
    return users.find(u => u.id === id)
  }
  static allProperty(){
    return propertys
  }
}

class Agent extends User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password){
      super(id, firstName, lastName, email, address, phoneNumber, password)
      this.isAgent = true
  }
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