import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import errHandle from '../helpers/errors';
import store from 'store';

dotenv.config();


class authMiddleware {
  static inputValidator(req, res, next) {
    const authSchema = Joi.object().keys({
      firstName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      lastName: Joi.string().min(3).regex(/^[a-zA-Z\-]+$/).required(),
      address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      phoneNumber: Joi.string().regex(/^[a-zA-Z0-9]{10,30}$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      isAgent: Joi.required(),
    });
    const data = Joi.validate(req.body, authSchema);
    if (typeof req.body.isAgent !== 'boolean') return errHandle(400, 'isAgent should be a boolean', res)
    if (data.error) return errHandle(400, `${data.error.details[0].message.replace('"', '').split('"')[0]} field  is invalid `, res);
    next();
  }

  // verify user token
  static verifyToken(req, res, next) {
    let keys = store.get('token')
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader && !keys ) return errHandle(403, 'provide a token to get our services', res);
    res.locals.token = bearerHeader.split(' ')[1] || keys;
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
