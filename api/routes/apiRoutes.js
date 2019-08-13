import express from 'express';
import property from '../controller/property';
import user from '../controller/users';
import FlagController from '../controller/flags';
import Ads from '../midleware/property';
import Auth from '../midleware/auth';

const router = express.Router();

const userRoutes = [ Auth.verifyToken, Auth.ensureUserToken, Ads.getPropertyById]
const adminRoute = [ Auth.verifyToken, Auth.ensureUserToken, Auth.agentCheck]
const adminRoutes = [ Auth.verifyToken, Auth.ensureUserToken, Auth.agentCheck, Ads.getPropertyById ]

router
  .post('/users/auth/signup', Auth.validator, Auth.checkUserExists, Auth.createUserToken, user.signUp)
  .post('/users/auth/signin', Auth.createUserToken, Auth.checkNoUser, user.signIn)
  .get('/users/myAccount', Auth.verifyToken, Auth.ensureUserToken, Ads.queryType, property.myAccount)
// property routes
  .post('/property', adminRoute, Ads.validator, Ads.checkIfAdExist, Ads.uploads, property.postProperty)
  .patch('/property/:id', adminRoutes,Ads.AgentAndOwner, property.updateProperty)
  .patch('/property/:id/sold', adminRoutes, Ads.checkIfSold, Ads.AgentAndOwner, property.markSold)
  .delete('/property/:id', adminRoutes, Ads.AgentAndOwner, property.deleteProperty)
  .get('/property/', Auth.verifyToken, Auth.ensureUserToken, Ads.queryType, property.getAllProperty)
  .get('/property/:id', userRoutes, property.singleProperty)
  .post('/flag/:id', userRoutes, Ads.checkIfFlagged, FlagController.postFlag)


export default router;
