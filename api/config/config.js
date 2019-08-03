import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dbe1sfmr4', 
    api_key: '378819748537291', 
    api_secret: 'v9AZqwP9SuCHLcNA8SXpBoI4rlk'
  });

export default cloudinary;