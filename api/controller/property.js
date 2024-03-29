import { Agent, User } from '../models/users';
import resHandle from '../helpers/response';
import { bodyHandle } from '../helpers/requests';
import getAdWithAgent from '../helpers/getAgent';
import { postHandle } from '../helpers/requests';
import getFavs from '../helpers/favourite'

class PropertyController {
  static postProperty(req, res) {
    const { keys, values } = postHandle(req)
    return Agent.createProperty(keys, values)
      .then(ad => resHandle(201, 'Property created', ad.rows[0], res));
  }

  static updateProperty(req, res) {
    return Agent.updateProperty(bodyHandle(req.body),req.params.id)
      .then(e => resHandle(200, 'Property Updated', e.rows[0], res));
  }

  static markSold(req, res) {
    return Agent.markPropertySold(req.params.id)
      .then(e => resHandle(200, 'property marked as sold', e.rows[0], res));
  }

  static deleteProperty(req, res) {
    Agent.delProperty(req.params.id);
    return res.status(200).send({ status: 200, message: 'property deleted successfully' });
  }

  static getAllProperty(req, res) {
    User.allProperty()
      .then(ad => {
        getAdWithAgent(ad).then(ads => resHandle(200, 'all property', ads, res))
      })
    }

  static singleProperty(req, res) {
    return User.getPropertyById(req.params.id)
    .then(ad => {
      getAdWithAgent(ad)
      .then(newAd => {
        User.addView(newAd[0].id,newAd[0].views+1)
        resHandle(200, 'one property', newAd, res)
      })
    })
  }

  static async myAccount(req,res){
    try {
      console.log("req.user.email")
      const myAds = await User.getPropertyByOwner(req.user.email)
      req.user.favourite = await getFavs(req.user.favourite)
      return resHandle(200, 'my account', { details:req.user, myAds:myAds.rows }, res)
    } catch (error) {
      res.send({status:400, message:error.message})
    }
    
  }

  static adToFavourite(req,res){
    const favExist = req.user.favourite.find(ad => ad === req.params.id)
    if(favExist) return res.status(409).send({status:409, message:'Item already added to Favourite'})
    req.user.favourite.push(req.params.id)
    User.adToFavourite(req.user.id, req.user.favourite)
    return res.status(409).send({status:200, message:'Item added to Favourite'})
  }

  static updateFavourite(req,res){
    User.updateFavourite(req.user.id, req.params.id, req.user.favourite)
    return res.status(409).send({status:200, message:'Property remove successful'})
  }
}


export default PropertyController;
