import Property from '../models/property';
import { Agent, User } from '../models/users';
import resHandle from '../helpers/response';

class PropertyController {
  static postProperty(req, res) {
    const { price, address, city, state, type } = req.body;
    const { email, phonenumber } = res.locals.user;
    return Agent.createProperty(new Property(price, address, city, state, type, res.locals.imgArr, email, phonenumber))
      .then(e => resHandle(201, 'Property created', e.rows[0], res));
  }

  static updateProperty(req, res) {
    const { price, address, city, state, type } = req.body;
    return Agent.updateProperty(new Property(price, address, city, state, type),req.params.Id)
      .then(e => resHandle(200, 'Property Updated', e.rows[0], res));
  }

  static markSold(req, res) {
    return Agent.markPropertySold(req.params.Id)
      .then(e => resHandle(200, 'property marked as sold', e.rows[0], res));
  }

  static deleteProperty(req, res) {
    Agent.delProperty(req.params.Id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }

  static getAllProperty(req, res) {
    User.allProperty(res.locals.user.isagent)
      .then(e => resHandle(200, 'all available property', e.rows, res));
  }

  static singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }

  static myAccount(req,res){
    return Property.getPropertyByOwner(res.locals.user.email)
      .then(e => resHandle(200, 'my account', {details:res.locals.user,myAds:e.rows}, res));

  }
}

export default PropertyController;
