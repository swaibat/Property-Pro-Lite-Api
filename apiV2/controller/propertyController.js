import Property from '../models/property';
import { propertys } from '../data/data';
import { Agent, User } from '../models/users';
import Resp from '../helpers/response';

class PropertyController {
  postProperty(req, res) {
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const { id } = res.locals.user;
    const adObj = new Property(id, price, address, city, state, type, imageUrl);
    const property = adObj.addProperty(adObj);
    property.then((e) => {
      console.log(req.path);
      return Resp(201, 'Property created', e.rows[0], res);
      // res.status(201).send({ status: 201, property: e.rows[0] });
    });
  }

  updateProperty(req, res) {
    const { property } = res.locals;
    const {
      price, address, city, state, type, imageUrl,
    } = req.body;
    const advert = Agent.updateProperty(property, price, address, city, state, type, imageUrl);
    res.status(200).send({ status: 200, property: advert });
  }

  markSold(req, res) {
    const { property } = res.locals;
    const advert = Agent.markPropertySold(property);
    res.status(200).send({ status: 200, property: advert });
  }

  deleteProperty(req, res) {
    const { property } = res.locals;
    Agent.deleteProperty(property);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }

  getAllProperty(req, res) {
    const property = User.allProperty();
    if (property.length < 1) return res.status(404).send({ status: 404, error: 'Ooops no property  found' });
    res.status(200).send({ status: 200, property });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}

export default PropertyController;
