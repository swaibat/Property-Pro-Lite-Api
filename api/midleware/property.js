/* eslint-disable linebreak-style */
import { propertys } from '../data/data';
import { users } from '../data/data';

// eslint-disable-next-line consistent-return
export function queryType(req, res, next) {
  const adType = propertys.filter(ad => ad.type === req.query.type);
  if (typeof req.query.type !== 'undefined') return res.status(200).send({ status: 200, adType });
  next();
}

// eslint-disable-next-line consistent-return
export function getPropertyById(req, res, next) {
  res.locals.property = propertys.find(property => property.id === parseFloat(req.params.Id));
  if (!res.locals.property) {
    return res.status(404).send({ error: 404, message: 'property with given id not Found' });
  }
  next();
}

// find if atall that agent owners the advert he wants to do operations on
export function AgentAndOwner(req, res, next) {
    const owner = users.find(user => user.email === res.locals.user.email );
    if(owner.id !== res.locals.property.owner) return res.send({error:403, message:'Your not the owner of this property'})
     next();
}