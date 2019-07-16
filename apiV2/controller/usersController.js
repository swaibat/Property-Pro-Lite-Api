import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User} from '../models/users';
import '@babel/polyfill';

dotenv.config();

class UserController {

  signUp(req, res) {
    const {firstName, lastName, email, address, phoneNumber, isAgent } = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const userObj = new User(firstName, lastName, email, address, phoneNumber, hashPassword, isAgent);
      userObj.createUser();
      return res.status(201).send({status: 201,message:'Signed up successfully',token:res.locals.token});
  }

  signIn(req, res) {
    return res.status(200).send({status: 200,message:'Signin successfully',token:res.locals.token});
  }
}

export default UserController;