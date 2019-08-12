import Property from '../models/property';
import { Agent, User } from '../models/users';
import resHandle from '../helpers/response';
import { bodyHandle } from '../helpers/requests';
import getAdWithAgent from '../helpers/getAgent';
import { postHandle } from '../helpers/requests';

class PropertyController {
  static postProperty(req, res) {
    const { keys, values } = postHandle(req)
    return Agent.createProperty(keys, values)
      .then(ad => resHandle(201, 'Property created', ad.rows[0], res));
  }

  static updateProperty(req, res) {
    return Agent.updateProperty(bodyHandle(req.body),req.params.Id)
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
    User.allProperty(req.user.isagent)
      .then(ad =>{
        getAdWithAgent(ad).then(ads => resHandle(201, 'all property', ads, res))
      })
    }

  static singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }

  static myAccount(req,res){
    return Property.getPropertyByOwner(req.user.email)
      .then(e => resHandle(200, 'my account', {details:req.user,myAds:e.rows}, res));

  }
}

export default PropertyController;
