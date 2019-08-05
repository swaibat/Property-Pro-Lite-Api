import Property from '../models/property';
import { Agent, User } from '../models/users';
import resHandle from '../helpers/response';

class PropertyController {
  postProperty(req, res) {
    const { price, address, city, state, type } = req.body;
    const { email, phonenumber } = res.locals.user;
    new Property(price, address, city, state, type, res.locals.imgArr, email, phonenumber).addProperty()
      .then(e => resHandle(201, 'Property created', e.rows[0], res));
  }

  updateProperty(req, res) {
    const { address, city, state } = req.body;
    Agent.updateProperty(address, state, city, req.params.Id)
      .then(e => resHandle(200, 'Property Updated', e.rows[0], res));
  }

  markSold(req, res) {
    Agent.markPropertySold(req.params.Id)
      .then(e => resHandle(200, 'property marked as sold', e.rows[0], res));
  }

  deleteProperty(req, res) {
    Agent.delProperty(req.params.Id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }

  getAllProperty(req, res) {
    User.allProperty(res.locals.user.isagent)
      .then(e => resHandle(200, 'all available property', e.rows, res));
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}

export default PropertyController;
