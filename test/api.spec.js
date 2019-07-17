import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata, testAds } from '../apiV2/data/data';
import userRoutes from '../apiV2/routes/auth';
import propertyRoutes from '../apiV2/routes/property';

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/property', propertyRoutes);
const should = chai.should();
let agentToken = '';
let userToken = '';
let agentOne = '';

chai.use(chaiHttp);

describe('/POST/signup routes', () => {
  it('CREATES a new User', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(testdata[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
});
