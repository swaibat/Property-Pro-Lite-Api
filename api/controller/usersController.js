import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/users';
import resHandle from '../helpers/response';
import '@babel/polyfill';

dotenv.config();

class UserController {
 async signUp(req, res) {
    const {
      firstName, lastName, email, address, phoneNumber, isAgent,
    } = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const userObj = new User(firstName, lastName, email, address, phoneNumber, hashPassword, isAgent);
    const user = await userObj.createUser();
    const { token } = res.locals;
    return resHandle(201, 'signed up successfully', { isAgent:user.rows[0].isagent, token}, res);
  }

  signIn(req, res) {
    const { token } = res.locals;
    return resHandle(200, 'signed in successfully', { isAgent:res.locals.isAgent, token }, res);
  }
}

export default UserController;
