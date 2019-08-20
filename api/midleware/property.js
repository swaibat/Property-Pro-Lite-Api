import Flag from '../models/flags';
import { User }from '../models/users';
import resHandle from '../helpers/response';
import errHandle from '../helpers/errors';
import cloudinary from '../config/config';
import validate from '../helpers/validator'
import { queryHandle } from '../helpers/requests'
import getAdWithAgent from '../helpers/getAgent'

class adsMiddleware {

  static validator(req, res, next) {
    const valid = [
      new validate({price:req}).string().required().min(2).max(30).numeric(),
      new validate({address:req}).string().required().min(2),
      new validate({city:req}).string().required().min(2),
      new validate({state:req}).string().required().min(2).alphaNum(),
      new validate({type:req}).string().required().types()
    ]
    const invalid = valid.find(e => e.error !== null)
    if(invalid) return errHandle(invalid.status, invalid.error, res);
    next()
  }

  static getPropertyById(req, res, next) {
    const { id } = req.params;
    const param = id.match(/^[0-9]+$/);
    if (!param) return errHandle(400, 'provide a valid number in parameters', res)
    return User.getPropertyById(id)
    .then((e) => {
      res.locals.property = e.rows[0]
      if (!e.rows[0]) return errHandle(404, 'property with given id not Found', res);
      next();
    });
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    User.getPropertyByOwner(req.user.email)
    .then(e => !e.rows[0] ? errHandle(403, 'Your do not own this property', res ):next())
  }


  static checkIfAdExist(req, res, next) {
    User.checkIfPropertyExist(queryHandle(req.body))
    .then(e => e.rows[0] ? errHandle(409, 'You can not post this propety again', res ):next())
  }


  static queryType(req, res, next) {
    if(req.query.type){
      return User.queryTypeOfProperty(req.query.type)
      .then(ad =>{
        getAdWithAgent(ad).then(ads => resHandle(200, 'Query successfull', ads, res))
      })
    }
    return next();
  }

  static checkIfFlagged(req, res, next) {
    return Flag.checkFlagged(res.locals.property.id)
      .then(e => e.rows[0] ? errHandle(409, 'property already flagged', res ):next())
  }

  static checkIfSold(req, res, next) {
    if (res.locals.property.status === 'sold') return errHandle(409, 'property already marked sold', res )
    next()
  }

  static uploads(req, res, next) {
    const imgs = req.files.imageUrl.length ? req.files.imageUrl : [req.files.imageUrl];
    let upload_res = imgs.map(e => e.tempFilePath).map(file => new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file, (error, result) => error ? reject(error) : resolve(result.url))
    })
    )
    Promise.all(upload_res)
       .then(result => { req.body.imageUrl = result; next() })
  }

}

export default adsMiddleware;
