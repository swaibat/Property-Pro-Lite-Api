import { User } from '../models/users';
import 'regenerator-runtime/runtime'

async function getAdWithAgent(ad){  
    const ads = [] 
    for (let i = 0; i < ad.rows.length; i++ ) {
        const a = await User.getUserByEmail(ad.rows[i].owner)
        if (a.rows[0]) {
            const {password,isagent,...noA} = a.rows[0];
            ad.rows[i].owner = noA
        }
        ads.push(ad.rows[i])
    }
    return ads
}



export default getAdWithAgent;
