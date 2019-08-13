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
  
  static getPropertyByOwner(email){
    return client.query(`SELECT * FROM property WHERE owner='${email}'`)
  }

  static checkIfPropertyExist(property){
    return client.query(`SELECT * FROM property WHERE ${property}`)
  }

  static queryAll(query){
      return client.query(`SELECT * FROM property WHERE ${query}`)
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

