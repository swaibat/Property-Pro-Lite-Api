import Property from '../models/property';
import Flag from '../models/flags';
import { User,Agent }from '../models/users';
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
    if(valid[0].error)return errHandle(valid[0].status, valid[0].error, res);
    next()
  }

  static getPropertyById(req, res, next) {
    return User.getPropertyById(req.params.Id)
    .then(ad => {
      getAdWithAgent(ad).then(a => {
        res.locals.property = a
        if (!res.locals.property) return errHandle(404, 'property with given id not Found', res);
        next();
      })
    })
  }

  // find if atall that agent owners the advert he wants to do operations on
  static AgentAndOwner(req, res, next) {
    Property.getPropertyByOwner(res.locals.user.email)
    .then(e => !e.rows[0] ? errHandle(403, 'Your do not own this property', res ):next())
  }


  static checkIfAdExist(req, res, next) {
    Property.checkIfPropertyExist(queryHandle(req.body))
    .then(e => e.rows[0] ? errHandle(409, 'You can not post this propety again', res ):next())
  }


  static queryType(req, res, next) {
    const queryLen = Object.entries(req.query).length;
    if(queryLen > 0){
      return Property.queryAll(queryHandle(req.query))
      .then(ad =>{
        getAdWithAgent(ad).then(ads => resHandle(201, 'Query successfull', ads, res))
      })
    }
    return next();
  }

  static checkIfFlagged(req, res, next) {
    return Flag.checkFlagged(res.locals.property.id)
      .then(e => e.rows[0] ? errHandle(409, 'property already flagged', res ):next())
  }

  static checkIfSold(req, res, next) {
    return Agent.markPropertySold(res.locals.property.id)
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
    .catch(error => error.code === 'ENOTFOUND' 
    ? errHandle(400,'No internet connection to remote storage', res ) : error)
    .then(result => {res.locals.imgArr = result; next()} )
}

}

export default adsMiddleware;
