/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();


class authMiddleware{
  
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
    if (typeof req.body.isAgent !== 'boolean') return res.status(400).send({ status: 400, error: 'isAgent should be a boolean' });
    if (data.error) {
      const resFomart = data.error.details[0].message.replace('"', '').split('"');
      const gotElem = resFomart[0];
      return res.status(400).send({ status: 400, error: `${gotElem} field  is invalid ` });
    }
    next();
  }
  
  // verify user token
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ status: 403, error: 'provide a token to get our services' });
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    res.locals.token = bearerToken;
    next();
  }
  
  // check if real users trying access
  static ensureUserToken(req, res, next) {
    jwt.verify(res.locals.token, process.env.appSecreteKey, async (err, user) => {
      if (err) return res.status(403).json({ error: 403, message: err.message });
      const dbUser = await User.getUserByEmail(user.email);
      res.locals.user = dbUser.rows[0];
      next();
    });
  }
  
  // function creates user token
  static createUserToken(req, res, next) {
    const { email } = req.body;
    res.locals.token = jwt.sign({ email }, process.env.appSecreteKey, { expiresIn: '24hr' });
    next();
  }
  
  // check if user already exists
  // eslint-disable-next-line consistent-return
  static async checkUserExists(req, res, next) {
    const user = await User.getUserByEmail(req.body.email);
    if (user.rows[0]) return res.status(409).send({ status: 409, error: 'user already exists' });
    next();
  }

  static async checkNoUser(req, res, next){
      const { email, password } = req.body;
      const user = await User.getUserByEmail(email);
      if (!user.rows[0]) return res.status(404).send({ status: 404, error: 'user doesnt exist please signup' });
      const passCompare = bcrypt.compareSync(password, user.rows[0].password);
      if (!passCompare) return res.status(400).send({ status: 400, message: 'wrong username or password' });
      next()
  }
  
  // check if the user is an agent
  static agentCheck(req, res, next) {
    const agent = User.getUserByEmail(res.locals.user.email);
    if (agent.isAgent === false) return res.status(401).send({ status: 401, error: 'Only agent can access this service' });
    res.locals.email = agent.email;
    next();
  }
}


export default authMiddleware;
