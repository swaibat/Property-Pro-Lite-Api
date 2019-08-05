import Property from '../models/property';
import Flag from '../models/flags';
import { User,Agent }from '../models/users';
import resHandle from '../helpers/response';
import errHandle from '../helpers/errors';
import cloudinary from '../config/config';

class adsMiddleware {

  static getPropertyById(req, res, next) {
    const { Id } = req.params;
    const validparam = Id.match(/^[0-9]+$/);
    if(!validparam) return res.status(400).send({ status: 400, error: 'provide a valid number in parameters' })
    User.getPropertyById(Id)
      .then(e => {
      res.locals.property = e.rows[0];
      if (!res.locals.property) return errHandle(404, 'property with given id not Found', res);
      next();
    })
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    Property.getPropertyByOwner(res.locals.user.email)
    .then(e => !e.rows[0] ? errHandle(403, 'Your do not own this property', res ):next())
  }


  static checkIfAdExist(req, res, next) {
    const { price, address, type } = req.body;
    Property.checkIfPropertyExist(res.locals.user.email, price, address, type)
    .then(e => e.rows[0] ? errHandle(409, 'You can not post this propety again', res ):next())
  }


  static queryType(req, res, next) {
    if (typeof req.query.type !== 'undefined') {
      const property = User.queryTypeOfProperty(req.query.type, res.locals.user.isagent);
      const matchType = req.query.type.match(/^(singlerooms|3bedrooms|5bedrooms|miniFlat|others)$/);
      if (!matchType) return errHandle(400, 'We only have these types singlerooms, 3bedrooms, 5bedrooms, miniFlat ,others', res);
      return property.then(e => resHandle(200, 'operation successfull', e.rows, res));
    }
    next();
  }

  static checkIfFlagged(req, res, next) {
    Flag.checkFlagged(res.locals.property.id)
    .then(e => e.rows[0] ? errHandle(409, 'property already flagged', res ):next())
  }

  static checkIfSold(req, res, next) {
    Agent.checkSold(res.locals.property.id)
    .then(e => e.rows[0] ? errHandle(409, 'property already marked sold', res ):next())
  }

  static uploads(req, res, next) {
  if(req.headers['content-type'] === 'application/json'){
    res.locals.imgArr = [req.body.imageUrl]
    return next()
  }

  const imgs = req.files.imageUrl.length ? req.files.imageUrl : [req.files.imageUrl];
  const  files = imgs.map(e => e.tempFilePath)
  let upload_res = files.map(file => new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file, (error, result) => {
          if(error) reject(error)
          else resolve(result.url)
      })
  })
  )
  Promise.all(upload_res)
    .catch(error => error.code === 'ENOTFOUND' ? errHandle(400,'No internet connection to remote storage', res ) : error)
    .then(result =>{
      res.locals.imgArr = result
      next()
    })
}

}

export default adsMiddleware;
