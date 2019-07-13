import Property from '../models/property';
import { propertys } from '../data/data';
import { Agent,User } from '../models/users';

class PropertyController {
  postProperty(req, res) {
      const id = propertys.length + 1;
      const { price, address, city, state, type, imageUrl } = req.body;
      const { password,isAdmin,token, ...noA } = res.locals.user;
      const property = new Property(id, noA, price, address, city, state, type, imageUrl); 
      Agent.createProperty(property);
      return res.status(201).send({ status:201, property });
    };

  updateProperty(req, res) {
    const { property } = res.locals;
    const {price, address, city, state, type, imageUrl} = req.body
    const advert = Agent.updateProperty(property,price, address, city, state, type, imageUrl);
    res.status(200).send({status:200,property:advert});
  }

  markSold(req, res) {
      const { property } = res.locals;
      const advert =  Agent.markPropertySold(property);
      res.status(200).send({status:200,property:advert});
  }

  deleteProperty(req, res) {
    const { property } = res.locals
    Agent.deleteProperty(property);
    return res.status(200).send({ status:200, message: 'property deleted successfully' });
  }

  // eslint-disable-next-line consistent-return
  getAllProperty(req, res) {
    const property = User.allProperty();
    if(property.length < 1) return res.status(404).send({ status: 404, error:'Ooops no property  found' });
    res.status(200).send({ status: 200, property });
  }

  singleProperty(req, res) {
    const { property } = res.locals;
    res.status(200).send({ status: 200, property });
  }
}

export default PropertyController;