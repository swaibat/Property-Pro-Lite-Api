import { User } from '../models/users';


async function getFavs(ads){
    let favList = [];
    for (let i = 0; i < ads.length; i++ ) {
        const a = await User.getPropertyById(ads[i])
        if (a.rows[0]) {
            favList.push(a.rows[0]) 
        }    
    }
    return  await favList;
}

export default getFavs;
