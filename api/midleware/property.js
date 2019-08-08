import Property from '../models/property';
import Flag from '../models/flags';
import { User,Agent }from '../models/users';
import resHandle from '../helpers/response';
import errHandle from '../helpers/errors';
import cloudinary from '../config/config';
import validate from '../helpers/validator'
import query from '../helpers/query'

class adsMiddleware {

  static validator(req, res, next) {
    const { price, address, city, state, type } = req.body;
    const valid = [
      new validate(price, req.body).string().required().min(2).max(30).numeric(),
      new validate(price, req.body).string().required().min(2).max(30).numeric(),
      new validate(address, req.body).string().required().min(2),
      new validate(city, req.body).string().required().min(2),
      new validate(state, req.body).string().required().min(2).alphaNum(),
      new validate(type, req.body).string().required().types()
    ]
    if(valid[0].error)return errHandle(valid[0].status, valid[0].error, res);
    next()
  }

  static getPropertyById(req, res, next) {
    const validparam = new validate(req.params.Id, req.body).numeric();
    if(validparam.error) return errHandle(400, 'provide a valid number in parameters', res)
    return User.getPropertyById(req.params.Id)
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
    const queryLen = Object.entries(req.query).length;
    if(queryLen > 0){
      return Property.queryAll(query(req.query))
        .then(e => resHandle(200, 'Query successfull', e.rows, res));
    }
    return next();
  }

  static checkIfFlagged(req, res, next) {
    return Flag.checkFlagged(res.locals.property.id)
      .then(e => e.rows[0] ? errHandle(409, 'property already flagged', res ):next())
  }

  static checkIfSold(req, res, next) {
    return Agent.checkSold(res.locals.property.id)
      .then(e => e.rows[0] ? errHandle(409, 'property already marked sold', res ):next())
  }

  static uploads(req, res, next) {
  const imgs = req.files.imageUrl.length ? req.files.imageUrl : [req.files.imageUrl];
  const files = imgs.map(e => e.tempFilePath)
  let upload_res = files.map(file => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, (error, result) => error ? reject(error) : resolve(result.url))
  })
  )
  Promise.all(upload_res)
    .catch(error => error.code === 'ENOTFOUND' ? errHandle(400,'No internet connection to remote storage', res ) : error)
    .then(result => {res.locals.imgArr = result; next()} )
}

}

export default adsMiddleware;
