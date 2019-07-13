import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Agent} from '../models/users';
import { users } from '../data/data';

dotenv.config();

class UserController {
  signUp(req, res) {
    const {firstName, lastName, email, address, phoneNumber,isAgent} = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const id = users.length + 1;
    const user = new User(id, firstName, lastName, email, address, phoneNumber, hashPassword,isAgent);
    const { token } = res.locals;
    user.token = token;
    users.push(user);
    const {password, ...noA } = user;
    return res.status(201).send({ status: 201, user:noA });
  }

  // eslint-disable-next-line consistent-return
  signIn(req, res) {
    const { token } = res.locals;
    const user = users.find(user => user.email === req.body.email);
    const matchDetails = users.find(user => user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password));
    if(!user){
      return res.status(400).send({ status: 400, error: 'user doesnt exist please signup' });
    }else if(!matchDetails) return res.status(400).send({ status: 400, message: 'wrong username or password' })
    user.token = token;
    const {password, ...noA } = user;
    res.status(200).send({ status: 200, user:noA});
  }
}

export default UserController;