import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/users';
import resHandle from '../helpers/response';

dotenv.config();


class UserController {
 signUp(req, res) {
    const { firstName, lastName, email, address, phoneNumber, isAgent } = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const { token } = res.locals;
    const a = new User(firstName, lastName, email, address, phoneNumber, hashPassword, isAgent).createUser()
    .then(e => resHandle(201, 'signed up successfully', { isAgent:e.rows[0].isagent, token}, res))
  }

  signIn(req, res) {
    const { token } = res.locals;
    return resHandle(200, 'signed in successfully', { isAgent:res.locals.isAgent, token }, res);
  }
}

export default UserController;
