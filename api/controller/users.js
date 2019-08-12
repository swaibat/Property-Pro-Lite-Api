import dotenv from 'dotenv';
import { User } from '../models/users';
import resHandle from '../helpers/response';
import { postHandle } from '../helpers/requests'

dotenv.config();


class UserController {
  static signUp(req, res) {
    const { keys, values, token } = postHandle(req)
    new User(keys, values).createUser()
      .then(e => resHandle(201, 'signed up successfully', { isAgent:e.rows[0].isagent, token}, res))
  }

  static signIn(req, res) {
    const { token } = req;
    return resHandle(200, 'signed in successfully', { isAgent:res.locals.isAgent, token }, res);
  }
}

export default UserController;
