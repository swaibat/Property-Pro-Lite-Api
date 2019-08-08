import client from '../services/db';

class Flag {

  static addFlag(property_id, reason, description) {
    const query = 'INSERT INTO flags(property_id, reason, description) VALUES($1,$2,$3) RETURNING *';
    const values = [property_id, reason, description];
    return client.query(query, values);
  }

  static checkFlagged(property_id) {
    return client.query(`SELECT * FROM flags WHERE property_id='${property_id}'`);
  }
}

export default Flag;
