import { User } from '../models/users';

const ads = []

async function getAdWithAgent(ad){   
    for (let i = 0; i < ad.rows.length; i++ ) {
        const a = await User.getUserByEmail(ad.rows[i].owneremail)
        const {password,isagent,...noA} = a.rows[0];
        ad.rows[i].owner = noA
        ads.push(ad.rows[i])
    }
    return ads
}



export default getAdWithAgent;
