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
  
  addProperty(){
      const query = 'INSERT INTO property(price, address, city, state, type, imageUrl,ownerEmail,ownerPhonenumber) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const values = [this.price, this.address, this.city, this.state, this.type, this.imageUrl,this.email,this.phoneNumber];
      return client.query(query, values);
  }
  static getPropertyById(id){
    const IdQuery = 'SELECT * FROM property WHERE id=$1'
    const value = [id];
    return client.query(IdQuery,value )
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
}

export default Property;
