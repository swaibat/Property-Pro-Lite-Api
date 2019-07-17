import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import Resp from '../helpers/response';

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
    if (typeof req.body.isAgent !== 'boolean'|| data.error) return Resp.HandleValidators(400, data.error, res);
    return next();
  }

  // verify user token
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return Resp.errorHandler(403, 'provide a token to get our services', res);
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    res.locals.token = bearerToken;
    next();
  }

  // check if real users trying access
  static ensureUserToken(req, res, next) {
    jwt.verify(res.locals.token, process.env.appSecreteKey, async (err, user) => {
      if (err) return Resp.errorHandler(403, err.message, res);
      const dbUser = await User.getUserByEmail(user.email);
      res.locals.user = dbUser.rows[0];
      next();
    });
  }

  // function creates user token
  static createUserToken(req, res, next) {
    const { email } = req.body;
    res.locals.token = jwt.sign({ email }, process.env.appSecreteKey, { expiresIn: '24hr' });
    return next();
  }

  // check if user already exists
  static async checkUserExists(req, res, next) {
    const user = await User.getUserByEmail(req.body.email);
    if (user.rows[0]) return Resp.errorHandler(409, 'user already exists', res);
    return next();
  }

  // check if user already exists
  static async checkNoUser(req, res, next) {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user.rows[0]) return Resp.errorHandler(404, 'user doesnt exist please signup', res);
    const passCompare = bcrypt.compareSync(password, user.rows[0].password);
    if (!passCompare) return Resp.errorHandler(400, 'wrong username or password', res);
    return next();
  }

  // check if the user is an agent
  static agentCheck(req, res, next) {
    if (res.locals.user.isagent === false) return res.status(403).send({error:403, message:'Only agent can access this service'})
    next();
}
}

export default authMiddleware;
