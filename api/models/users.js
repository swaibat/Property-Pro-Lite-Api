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
    return client.query(`SELECT * FROM property WHERE id='${id}'`)
  }


  static getUserByEmail(email) {
    return client.query(`SELECT * FROM users WHERE email='${email}'`);
  }

  static queryTypeOfProperty(type, isagent) {
    const query = isagent
      ? 'SELECT * FROM property WHERE type=$1 '
      : `SELECT * FROM property WHERE type=$1 and status='available' `;
    return client.query(query, [type]);
  }


  static allProperty(isagent) {
    return client.query(
      isagent
      ? 'SELECT * FROM property'
      : `SELECT * FROM property WHERE status='available'`
    );
  }

}

class Agent extends User {

  static createProperty(ad){
    const query = 'INSERT INTO property(price, address, city, state, type, imageUrl,ownerEmail,ownerPhonenumber) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
    const values = [ad.price, ad.address, ad.city, ad.state, ad.type, ad.imageUrl, ad.email, ad.phoneNumber];
    return client.query(query, values);
  }

  static updateProperty(property, id) {
    return client.query(`UPDATE property SET ${property} WHERE id='${id}' RETURNING *`);
  }

  static markPropertySold(id) {
    return client.query(`UPDATE property SET status='sold' WHERE id='${id}' RETURNING *`);
  }

  static delProperty(id) {
    return client.query(`DELETE FROM  property WHERE id='${id}' RETURNING *`);
  }
}

export { Agent, User }

