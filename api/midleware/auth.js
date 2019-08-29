import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users';
import errHandle from '../helpers/errors';
import validate from '../helpers/validator';

dotenv.config();

class authMiddleware {

  static validator(req, res, next) {
    const valid = [
      new validate({firstName:req}).string().required().min(2).max(30).alpha(),
      new validate({lastName:req}).string().required().min(2).max(30).alpha(),
      new validate({email:req}).string().required().email(),
      new validate({address:req}).string().required().min(2).alphaNum(),
      new validate({phoneNumber:req}).string().required().min(3).max(15).numeric()
    ]
    const invalid = valid.find(e => e.error !== null)
    if(invalid) return errHandle(invalid.status, invalid.error, res);
    next()
  }

  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return errHandle(403, 'provide a token to get our services', res);
    req.token = bearerHeader.split(' ')[1]
    next();
  }

  // check if real users trying access
  static ensureUserToken(req, res, next) {
    jwt.verify(req.token, process.env.appSecreteKey, async (err, user) => {
      if (err) return errHandle(403, err.message.replace("jwt", "Token"), res);;
      const newUser = await User.getUserByEmail(user.email)
      if(!newUser.rows[0]) return res.status(404).send({status:404, message:'user with given email not found'})
      req.user = newUser.rows[0]
      next()
    });
  }

  // function creates user token
  static createUserToken(req, res, next) {
    req.token = jwt.sign({ email:req.body.email }, process.env.appSecreteKey, { expiresIn: '24hr' });
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
        req.user = u.rows[0]
        return next();
    })
  }

  // check if the user is an agent
  static agentCheck(req, res, next) {
    !req.user.isagent ? errHandle(403, 'Only agent can access this service', res) : next();
  }
}

export default authMiddleware;
