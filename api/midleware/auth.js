import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import errHandle from '../helpers/errors';
import validate from '../helpers/validator'
import store from 'store';

dotenv.config();

class authMiddleware {

  static validator(req, res, next) {
    const { firstName, lastName, email, address, phoneNumber } = req.body;
    const valid = [
      new validate(firstName, req.body).string().required().min(2).max(30).alpha(),
      new validate(lastName, req.body).string().required().min(2).max(30).alpha(),
      new validate(email, req.body).string().required().email(),
      new validate(address, req.body).string().required().min(2).alphaNum(),
      new validate(phoneNumber, req.body).string().required().min(3).max(15).numeric()
    ]
    if(valid[0].error)return errHandle(valid[0].status, valid[0].error, res);
    next()
  }

  // verify user token
  static verifyToken(req, res, next) {
    let keys = store.get('token')
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader && !keys ) return errHandle(403, 'provide a token to get our services', res);
    bearerHeader ? res.locals.token = bearerHeader.split(' ')[1] : res.locals.token = keys;
    next();
  }

  // check if real users trying access
  static ensureUserToken(req, res, next) {
    jwt.verify(res.locals.token, process.env.appSecreteKey, (err, user) => {
      if (err) return errHandle(403, err.message.replace("jwt", "Token"), res);;
      User.getUserByEmail(user.email)
        .then(u => {res.locals.user = u.rows[0], next()});
    });
  }

  // function creates user token
  static createUserToken(req, res, next) {
    res.locals.token = jwt.sign({ email:req.body.email }, process.env.appSecreteKey, { expiresIn: '24hr' });
    store.set('token', res.locals.token)
    return next();
  }

  // check if user already exists
  static checkUserExists(req, res, next) {
    User.getUserByEmail(req.body.email)
      .then(newUser =>{
      if (newUser.rows[0]) return errHandle(409, 'user already exists', res);
      return next();
    })
  }

  // check if user already exists
  static checkNoUser(req, res, next) {
    const { email, password } = req.body;
    User.getUserByEmail(email)
      .then((u) => {
        if (!u.rows[0]) return errHandle(404, 'user doesnt exist please signup', res);
        const passCompare = bcrypt.compareSync(password, u.rows[0].password);
        if (!passCompare) return errHandle(400, 'wrong username or password', res);
        res.locals.isAgent = u.rows[0].isagent
        return next();
    })
  }

  // check if the user is an agent
  static agentCheck(req, res, next) {
    !res.locals.user.isagent ? errHandle(403, 'Only agent can access this service', res) : next();
  }
}

export default authMiddleware;
