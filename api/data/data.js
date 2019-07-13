/* eslint-disable linebreak-style */
// admin123 password
export const users = [
    {
      id: 1,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      address: 'kampala',
      phoneNumber: '+256758307272',
      password: '$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq',
      isAgent: true,
    },
    {
      id: 2,
      firstName: 'agent',
      lastName: 'admin',
      email: 'agent@gmail.com',
      address: 'kampala',
      phoneNumber: '+256758307272',
      password: '$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq',
      isAgent: true,
    },
  ];
  
  export const testdata = [
    {
      firstName: 'vella',
      lastName: 'vella',
      email: 'vella@gmail.com',
      address: 'kampala',
      phoneNumber: '07753225633',
      password: 'vella',
      isAgent: false,
    },
    { lastName: 'menk' },
    { firstName: 1 },
    {
      email: 'vella@gmail.com',
      password: 'vella',
    },
    {
      email: 'vella@gmail.com',
      password: 'amaarn',
    },
    {
      firstName: 'agenttest',
      lastName: 'agent',
      email: 'agenttest@gmail.com',
      address: 'kampala',
      phoneNumber: '07753225633',
      password: 'agenttest',
      isAgent: true,
    },
    {
      firstName: 'agent test',
      lastName: 'agent',
      email: 'agenttest@gmail.com',
      address: 'kampala',
      phoneNumber: '07753225633',
      password: 'agenttest',
      isAgent: true,
    },
    {
      firstName: 'agen',
      lastName: 'agent',
      email: 'agenttestgmail.com',
      address: 'kampala',
      phoneNumber: '07753225633',
      password: 'agenttest',
      isAgent: true,
    },
    {
      firstName: 'agen',
      lastName: 'agent',
      email: 'agenttes@tgmail.com',
      address: 'kampala',
      phoneNumber: '0775322',
      password: 'agenttest',
      isAgent: true,
    },
    {
      firstName: 'agen',
      lastName: 'agent',
      email: 'agenttes@tgmail.com',
      address: 'kampala',
      phoneNumber: '0775322666',
      password: 'agenttest',
      isAgent: 'true',
    },
    {
      email: 'vellaab@gmail.com',
      password: 'amaarn',
    },
    {
      firstName: 've lla',
      lastName: 'vella',
      email: 'vella@gmail.com',
      address: 'kampala',
      phoneNumber: '07753225633',
      password: 'vella',
      isAgent: false,
    }
  
  ];
  
  export const propertys = [
    {
      id: 1,
      owner: {
        id: 1,
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        address: "kampala",
        phoneNumber: "+256758307272",
        isAgent: true
    },
      price: 200,
      city: 'gulu',
      state: 'nothern',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg',
      status: 'available',
    },
    {
      id: 2,
      owner: {
        id: 2,
        firstName: 'agent',
        lastName: 'admin',
        email: 'agent@gmail.com',
        address: 'kampala',
        phoneNumber: '+256758307272',
        isAgent: true,
      },
      price: 200,
      city: 'anyang',
      state: 'eastern',
      address: 'kigali',
      type: 'miniflat',
      imageUrl: 'images/miniflat.png',
      status: 'sold',
    },
  ];
  
  export const testAds = [
    {
      price: 200,
      city: 'kampala',
      state: 'central',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg'
    },
    {
      price: 200,
      city: 'kampala',
      state: 'western',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg',
      status: 'sold',
    },
    {
      price: 200,
      city: 'kampala',
      state: 'central',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg'
    },
    {
      price: '200',
    },
    {
      price: 200,
    },
    {
      price: 200,
      city: false,
      state: 'central',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg',
      status: 'available',
    },
    {
      price: 200,
      city: 'false',
      state: 'cent ral',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.jpg',
      status: 'available',
    },
    {
      price: 200,
      city: 'false',
      state: 'central',
      address: 'kampala',
      type: '3bedrooms',
      imageUrl: 'images/hose1.mp4',
      status: 'available',
    },
    {
      price: 300,
      city: 'kampala',
      state: 'central',
      address: 'kampala',
      type: 'bedrooms',
      imageUrl: 'images/hose1.jpg'
    },
    {
      price: '300',
      city: 'kampala',
      state: 'central',
      address: 'kampala',
      type: 'bedrooms',
      imageUrl: 'images/hose1.jpg'
    },
  ];
  // const adOne = new Property(1,1,200,'gulu','nothern','3bedrooms','images/hose1.jpg','available');
  // const adTwo = new Property(2,3,600,'anyang','eastern','kigali','miniflat','images/miniflat.png','sold');
  
  // export const propertys = [adOne,adTwo];
  
  // const userOne = new Admin(1,'admin','admin','admin@gmail.com','kampala','256758307272','$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq',true);
  // const userTwo = new Admin(1,'agent','admin','agent@gmail.com','kampala','256758307272','$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq',true);
  // export const users = [userOne,userTwo];