/* eslint-disable linebreak-style */
import { propertys } from '../data/data';
import Property from '../models/property';
import Joi from '@hapi/joi';

class adsMiddleware {
  static adsValidator(req, res, next) {
    const schema = Joi.object().keys({
      price: Joi.number().required(),
      address: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().min(2).required(),
      type: Joi.string().required(),
      imageUrl: Joi.string().regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/).required(),
    });
    const result = Joi.validate(req.body, schema);
    const matchType = req.body.type.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/);
    if (!matchType) return res.status(400).send({ status: 400, error: 'We only have these types 1bedrooms, 3bedrooms, 5bedrooms, miniFlat ,others' });
    if (typeof req.body.price !== 'number') return res.status(400).send({ status: 400, error: 'price should be a number' });
    if (result.error) {
      const errMsg = result.error.details[0].message;
      return res.status(400).send({ status: 400, error: `${errMsg}` });
    }
    next();
  }

  // eslint-disable-next-line consistent-return
  static queryType(req, res, next) {
    const property = propertys.filter(ad => ad.type === req.query.type);
    if (typeof req.query.type !== 'undefined'){
      const matchType = req.query.type.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/);
      if (!matchType){
        return res.status(400).send({ status: 400, error: 'We only have these types 1bedrooms, 3bedrooms, 5bedrooms, miniFlat ,others' });
      }else if(property.length < 1) return res.status(404).send({ status: 404, error:'Ooops property type not found' });
      return res.status(200).send({ status: 200, property });
    } 
    next();
  }

  // eslint-disable-next-line consistent-return
  static getPropertyById(req, res, next) {
    const { Id } = req.params;
    const validparam = Id.match(/^[0-9]$/);
    if(!validparam) return res.status(404).send({ status: 400, error: 'provide a valid number in parameters' })
    res.locals.property = propertys.find(property => property.id === parseFloat(Id));
    if (!res.locals.property) {
      return res.status(404).send({ status: 404, error: 'property with given id not Found' });
    }
    next();
  }

  static checkIfAdExist(req, res, next) {
    const ownerId = res.locals.user.id;
    const { price, address, type } = req.body;
    const foundProperty = Property.checkIfPropertyExist(ownerId,price,address,type)
    if (foundProperty) return res.status(409).send({ status: 409, error: 'You can not post this propety again' });
    next();
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    const { user, property } = res.locals;
    if (user.id !== property.owner) return res.status(403).send({ status: 403, error: 'Your do not own this property' });
    next();
  }
}

export default adsMiddleware;

