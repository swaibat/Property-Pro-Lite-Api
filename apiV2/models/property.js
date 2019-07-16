import { propertys } from "../data/data";

class Property {
  constructor(id, owner, price, address, city, state, type, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
    this.status = 'available';
    this.createdOn = Date.now()
  }

  static checkIfPropertyExist(ownerId,price,address,type){
    return propertys.find(advert => advert.owner.id === ownerId &&
      advert.price === price &&
      advert.address === address &&
      advert.type === type);
  }
}

export default Property;