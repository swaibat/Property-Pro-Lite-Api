import express from 'express';
import PropertyController from '../controller/property';
import UserController from '../controller/users';
import FlagController from '../controller/flags';
import Ads from '../midleware/property';
import Auth from '../midleware/auth';

const router = express.Router();

const property = new PropertyController();
const user = new UserController();

router
  .post('/users/auth/signup', Auth.inputValidator, Auth.checkUserExists, Auth.createUserToken, user.signUp)
  .post('/users/auth/signin', Auth.createUserToken, Auth.checkNoUser, user.signIn)
// property routes
  .post('/property', Auth.verifyToken, Auth.ensureUserToken, Auth.agentCheck, Ads.checkIfAdExist, Ads.uploads, property.postProperty)
  .patch('/property/:Id', Auth.verifyToken, Auth.ensureUserToken, Ads.getPropertyById, Ads.AgentAndOwner, property.updateProperty)
  .patch('/property/:Id/sold', Auth.verifyToken, Auth.ensureUserToken, Auth.agentCheck, Ads.getPropertyById, Ads.checkIfSold, Ads.AgentAndOwner, property.markSold)
  .delete('/property/:Id', Auth.verifyToken, Auth.ensureUserToken, Auth.agentCheck, Ads.getPropertyById, Ads.AgentAndOwner, property.deleteProperty)
  .get('/property/', Auth.verifyToken, Auth.ensureUserToken, Ads.queryType, property.getAllProperty)
  .get('/property/:Id', Auth.verifyToken, Auth.ensureUserToken, Ads.getPropertyById, property.singleProperty)
// flag
  .post('/flag/:Id', Auth.verifyToken, Auth.ensureUserToken, Ads.getPropertyById, Ads.checkIfFlagged, FlagController.postFlag)


export default router;
