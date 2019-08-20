import dotenv from 'dotenv';
import { User } from '../models/users';
import resHandle from '../helpers/response';
import { postHandle } from '../helpers/requests'
import cloudinary from '../config/config';

dotenv.config();


class UserController {
  static signUp(req, res) {
    const { keys, values, token } = postHandle(req)
    new User(keys, values).createUser()
      .then(e => resHandle(201, 'signed up successfully', { isAgent:e.rows[0].isagent, token}, res))
  }

  static signIn(req, res) {
    const { token } = req;
    const online = true;
    User.lastAcess(req.user.id,online)
    return resHandle(200, 'signed in successfully', { isAgent:req.user.isagent, token }, res);
    
  }

  static avatar(req, res) {
    cloudinary.uploader.upload(req.files.avatar.tempFilePath, function(result, error) {
      User.updateAvatar(result.url,req.user.id)
      res.status(200).send({status:200, message:'upload successful'})
    });
  }

  static logOut(req, res) {
    const online = false;
    res.status(200).send({status:200, message:'logout successful'})
    User.lastAcess(req.user.id, online)
  }
}

export default UserController;
