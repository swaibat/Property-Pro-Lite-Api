import{Admin}from"../models/users";import{Property}from"../models/property";const adOne=new Property(1,1,200,"gulu","nothern","3bedrooms","images/hose1.jpg","available"),adTwo=new Property(2,3,600,"anyang","eastern","kigali","miniflat","images/miniflat.png","sold");export const propertys=[adOne,adTwo];const userOne=new Admin(1,"admin","admin","admin@gmail.com","kampala","256758307272","$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq",!0),userTwo=new Admin(1,"agent","admin","agent@gmail.com","kampala","256758307272","$2b$10$ksxz1QB/3qKkQNAvgL4TbusIATCFQBq1qNRIdHDpd9xgvFwLt76nq",!0);export const users=[userOne,userTwo];export const testdata=[{firstName:"vella",lastName:"vella",email:"vella@gmail.com",address:"kampala",phoneNumber:"07753225633",password:"vella",isAdmin:!1},{lastName:"menk"},{firstName:1},{email:"vella@gmail.com",password:"vella"},{email:"amaar@gmail.com",password:"amaar"},{firstName:"agenttest",lastName:"agent",email:"agenttest@gmail.com",address:"kampala",phoneNumber:"07753225633",password:"agenttest",isAdmin:!0},{firstName:"agent test",lastName:"agent",email:"agenttest@gmail.com",address:"kampala",phoneNumber:"07753225633",password:"agenttest",isAdmin:!0},{firstName:"agen",lastName:"agent",email:"agenttestgmail.com",address:"kampala",phoneNumber:"07753225633",password:"agenttest",isAdmin:!0},{firstName:"agen",lastName:"agent",email:"agenttes@tgmail.com",address:"kampala",phoneNumber:"0775322",password:"agenttest",isAdmin:!0},{firstName:"agen",lastName:"agent",email:"agenttes@tgmail.com",address:"kampala",phoneNumber:"0775322666",password:"agenttest",isAdmin:"true"}];export const testAds=[{price:200,city:"kampala",state:"central",address:"kampala",type:"3bedrooms",imageUrl:"images/hose1.jpg"},{price:200,city:"kampala",state:"western",address:"kampala",type:"3bedrooms",imageUrl:"images/hose1.jpg",status:"sold"},{address:"nansana",city:"kampala"},{price:"200"},{price:200},{price:200,city:!1,state:"central",address:"kampala",type:"3bedrooms",imageUrl:"images/hose1.jpg",status:"available"},{price:200,city:"false",state:"cent ral",address:"kampala",type:"3bedrooms",imageUrl:"images/hose1.jpg",status:"available"},{price:200,city:"false",state:"central",address:"kampala",type:"3bedrooms",imageUrl:"images/hose1.mp4",status:"available"}];