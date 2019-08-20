import client from '../services/db';

class User {
  constructor(keys, values) {
    this.keys = keys;
    this.values = values
  }

  createUser() {
    const userQuery = `INSERT INTO users(${this.keys}) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    return client.query(userQuery, this.values);
  }

  static getPropertyById(id){
    return client.query(`SELECT * FROM property WHERE id='${id}'`)
  }

  static addView(id,views){
    return client.query(`UPDATE property SET views='${views}' WHERE id='${id}' RETURNING *`)
  }

  static getUserByEmail(email) {
    return client.query(`SELECT * FROM users WHERE email='${email}'`);
  }

  static queryTypeOfProperty(type) {
    return client.query(`SELECT * FROM property WHERE type='${type}' and status='available' `);
  }


  static allProperty() {
    return client.query(`SELECT * FROM property WHERE status='available'`);
  }
  
  static getPropertyByOwner(email){
    return client.query(`SELECT * FROM property WHERE owner='${email}'`)
  }

  static checkIfPropertyExist(property){
    return client.query(`SELECT * FROM property WHERE ${property}`)
  }

  static updateAvatar(avatar, id) {
    return client.query(`UPDATE users SET avatar='${avatar}' WHERE id='${id}' RETURNING *`);
  }

  static lastAcess(id,online) {
    return client.query(`UPDATE users SET online='${online}', last_access ='${new Date()}' WHERE id='${id}' RETURNING *`);
  }

  static resetPassword(password,email) {
    return client.query(`UPDATE users SET password='${password}' WHERE email='${email}' RETURNING *`);
  }
}

class Agent extends User {

  static createProperty(keys,values){
    const query = `INSERT INTO property(${keys}) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
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

