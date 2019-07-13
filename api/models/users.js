import { users,propertys } from '../data/data';

class User {
  constructor(id, firstName, lastName, email, address, phoneNumber, password,isAgent ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.isAgent = isAgent;
    this.password = password;
  }

  static getUserByEmail(email){
    return users.find(u => u.email === email)
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