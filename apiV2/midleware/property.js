import Joi from '@hapi/joi';
import { propertys } from '../data/data';
import Property from '../models/property';
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
    const { Id } = req.params;
    const validparam = Id.match(/^[0-9]+$/);
    if (!validparam) return Resp(400, 'provide a valid number in parameters', res);
    res.locals.property = propertys.find(property => property.id === parseFloat(Id));
    if (!res.locals.property) {
      return Resp(404, 'property with given id not Found', res);
    }
    next();
  }

  static async checkIfAdExist(req, res, next) {
    const ownerId = res.locals.user.id;
    const { price, address, type } = req.body;
    const foundProperty = await Property.checkIfPropertyExist(ownerId, price, address, type);
    if (foundProperty) return Resp(403, 'You can not post this propety again', res);
    next();
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    const { user, property } = res.locals;
    if (user.id !== property.owner.id) return Resp(403, 'Your do not own this property', res);
    next();
  }

  static queryType(req, res, next) {
    const property = propertys.filter(ad => ad.type === req.query.type);
    if (typeof req.query.type !== 'undefined') {
      const matchType = req.query.type.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/);
      if (!matchType) return Resp(403, 'We only have these types 1bedrooms, 3bedrooms, 5bedrooms, miniFlat ,others', res);
      if (property.length < 1) return Resp(404, 'Ooops property type not found', res);
      return res.status(200).send({ status: 200, property });
    }
    next();
  }
}

export default adsMiddleware;
