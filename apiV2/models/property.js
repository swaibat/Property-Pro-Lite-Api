import client from '../services/db';
class Property {
  constructor(owner, price, address, city, state, type, imageUrl) {
    this.owner = owner;
    this.price = price;
    this.city = city;
    this.state = state;
    this.address = address;
    this.type = type;
    this.imageUrl = imageUrl;
  }
  addProperty(){
      const query = 'INSERT INTO property(owner, price, address, city, state, type, imageUrl) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
      const values = [this.owner, this.price, this.address, this.city, this.state, this.type, this.imageUrl];
      return client.query(query, values);
  }
  static getPropertyById(id){
    const IdQuery = 'SELECT * FROM property WHERE id=$1'
    const value = [id];
    return client.query(IdQuery,value )
  }
  static getPropertyByOwner(id){
    const IdQuery = 'SELECT * FROM property WHERE owner=$1'
    const value = [id];
    return client.query(IdQuery,value )
  }

  static checkIfPropertyExist(ownerId,price,address,type){
    const typeQuery = 'SELECT * FROM property WHERE owner=$1 and price=$2 and'
    return propertys.find(advert => advert.owner.id === ownerId &&
      advert.price === price &&
      advert.address === address &&
      advert.type === type);
  }
}
export default Property;
