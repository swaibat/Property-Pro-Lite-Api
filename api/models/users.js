import client from '../services/db';

class User {
  constructor(firstName, lastName, email, address, phoneNumber, password, isAgent) {
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

  static getPropertyById(id){
    const IdQuery = 'SELECT * FROM property WHERE id=$1'
    const value = [id];
    return client.query(IdQuery,value )
  }


  static getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    return client.query(query, values);
  }

  static queryTypeOfProperty(type, isagent) {
    const query = isagent
      ? 'SELECT * FROM property WHERE type=$1 '
      : `SELECT * FROM property WHERE type=$1 and status='available' `;
    const value = [type];
    return client.query(query, value);
  }


  static allProperty(isagent) {
    const query = isagent
      ? 'SELECT * FROM property'
      : `SELECT * FROM property WHERE status='available' `;
    return client.query(query);
  }

}

class Agent extends User {

  static createProperty(ad){
    const query = 'INSERT INTO property(price, address, city, state, type, imageUrl,ownerEmail,ownerPhonenumber) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
    const values = [ad.price, ad.address, ad.city, ad.state, ad.type, ad.imageUrl, ad.email, ad.phoneNumber];
    return client.query(query, values);
  }

  static updateProperty(ad, id) {
    const query = 'UPDATE property SET price=$1, address=$2, city=$3, state=$4, type=$5 WHERE id=$6 RETURNING *';
    const value = [ad.price, ad.address, ad.city, ad.state, ad.type, id];
    return client.query(query, value);
  }


  static markPropertySold(id) {
    const query = 'UPDATE property SET status=$1 WHERE id=$2 RETURNING *';
    const value = ['sold', id];
    return client.query(query, value);
  }

  static checkSold(id) {
    const query = 'SELECT * FROM property WHERE status=$1 and id=$2 ';
    const value = ['sold', id];
    return client.query(query, value);
  }

  static delProperty(id) {
    const query = 'DELETE FROM  property WHERE id=$1 RETURNING *';
    const value = [id];
    return client.query(query, value);
  }
}

export { Agent, User }

