import  Flag  from '../models/flags';
import resHandle from '../helpers/response';

class FlagController {
  static postFlag(req, res) {
    const {reason,description} = req.body;
    Flag.addFlag(res.locals.property.id, reason, description)
    .then(e => resHandle(201, 'flag posted', e.rows[0], res));
  }
}

export default FlagController;