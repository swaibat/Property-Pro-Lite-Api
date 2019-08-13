import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata, testAds, testFlag } from '../api/data/data';
import app from "../index";

const should = chai.should();
let agentToken = '';
let userToken = '';
let agentTwo = '';

chai.use(chaiHttp);

describe('routes', () => {
  it('User', (done) => {
    chai.request(app)
      .post('/api/v2/users/auth/signin')
      .send(testdata[0])
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('Agent', (done) => {
    chai.request(app)
      .post('/api/v2/users/auth/signin')
      .send(testdata[5])
      .end((err, res) => {
        agentToken = res.body.data.token;
        done();
      });
  });
  it('Agent two', (done) => {
    chai.request(app)
      .post('/api/v2/users/auth/signin')
      .send(testdata[11])
      .end((err, res) => {
        agentTwo = res.body.data.token;
        done();
      });
  });
});

describe('ALL AGENT strict routes', () => {
  it('CREATES a new Property', (done) => {
    chai.request(app)
      .post('/api/v2/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field(testAds[0])
      .attach("imageUrl","api/data/1.png") 
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('city');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
  it('CHECK if property exists', (done) => {
    chai.request(app)
      .post('/api/v2/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field(testAds[0])
      .attach("imageUrl","api/data/1.png") 
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You can not post this propety again');
        done();
      });
  });
  it('UPDATE a Property', (done) => {
    chai.request(app)
      .patch('/api/v2/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field(testAds[2])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('city');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('PATCH a Property', (done) => {
    chai.request(app)
      .patch('/api/v2/property/1/sold')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('status').eql('sold');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('GET agent property', (done) => {
    chai.request(app)
      .get('/api/v2/users/myAccount')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
  it('PATCH a Property exist', (done) => {
    chai.request(app)
      .patch('/api/v2/property/1/sold')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('property already marked sold');
        res.body.should.have.property('status').eql(409);
        done();
      });
  });
  it('GET a specific Property', (done) => {
    chai.request(app)
      .get('/api/v2/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('VIEW all Property', (done) => {
    chai.request(app)
      .get('/api/v2/property')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('VIEW all Propertys agent', (done) => {
    chai.request(app)
      .get('/api/v2/property')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});
describe('/CHECK tokens and relevant middlewares', () => {
  it('CHECK for ivalid token', (done) => {
    chai.request(app)
      .get('/api/v2/property')
      .set('Authorization', `Bearer ${agentToken}1`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET NOTFOUND Property', (done) => {
    chai.request(app)
      .get('/api/v2/property/9')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('PARAMS validate id', (done) => {
    chai.request(app)
      .get('/api/v2/property/9-')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('provide a valid number in parameters');
        done();
      });
  });
  it('check user is agent', (done) => {
    chai.request(app)
      .patch('/api/v2/property/1/sold')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('Only agent can access this service');
        done();
      });
  });
});

describe('POST/flag', () => {
  it('CREATES a new Flag', (done) => {
    chai.request(app)
      .post('/api/v2/flag/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testFlag[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('reason');
        res.body.data.should.have.property('description');
        res.body.should.have.property('status').eql(201);
        done();
      });
  });
  it('CHECK if exists', (done) => {
    chai.request(app)
      .post('/api/v2/flag/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .send(testFlag[0])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('property already flagged');
        res.body.should.have.property('status').eql(409);
        done();
      });
  });
});

describe('/VALIDATES all input fields', () => {
  it('view specific property Not found', (done) => {
    chai.request(app)
      .get('/api/v2/property?type=miniFlat')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error').eql('Ooop not found');
        done();
      });
  });
  it('agent query available and sold property', (done) => {
    chai.request(app)
      .get('/api/v2/property?type=3bedrooms')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });
  it('DELETE a Property', (done) => {
    chai.request(app)
      .delete('/api/v2/property/1')
      .set('Authorization', `Bearer ${agentToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('property deleted successfully');
        res.body.should.have.property('status').eql(200);
        done();
      });
  });
});



