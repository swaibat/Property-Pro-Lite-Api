import Joi from '@hapi/joi';
import Property from '../models/property';
import { User } from '../models/users';
import Resp from '../helpers/response';
import Err from '../helpers/errors';

class adsMiddleware {
  static adsValidator(req, res, next) {
    const schema = Joi.object().keys({
      price: Joi.number().required(),
      address: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().min(2).required(),
      type: Joi.string().regex(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/).required(),
      imageUrl: Joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/).required(),
    });
    const data = Joi.validate(req.body, schema);
    if (data.error) {
      const resFomart = data.error.details[0].message.replace('"', '').split('"');
      const gotElem = resFomart[0];
      return Err(400, `${gotElem} field  is invalid `, res)
    }
    next();
  }

  static getPropertyById(req, res, next) {
    const property =  Property.getPropertyById(req.params.Id);
    property.then(e => {
      res.locals.property = e.rows[0];
      if (!res.locals.property) return res.status(404).send({ error: 404, message: 'property with given id not Found' });
      next();
    });
  }
  
  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    const owner = Property.getPropertyByOwner(res.locals.user.id);
    owner.then(e => {
      if (!e.rows[0]) return res.status(403).send({ error: 403, message: 'Your do not own this property' });
      next();
    });
  }
  static async checkIfAdExist(req, res, next) {
    const ownerId = res.locals.user.id;
    const { price, address, type } = req.body;
    const foundProperty = await Property.checkIfPropertyExist(ownerId, price, address, type);
    if (foundProperty) return Resp(403, 'You can not post this propety again', res);
    next();
  }

  static queryType(req, res, next) {
    const property =  User.queryTypeOfProperty(req.query.type);
    property.then(e => {
      if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, property: e.rows });
      next();
    }); 
  }

}

export default adsMiddleware;
