import chai from 'chai';
import chaiHttp from 'chai-http';
import { testdata } from '../apiV2/data/data';
import app from "../index";

const should = chai.should();

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
    it('CREATES a new Agent', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(testdata[5])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          done();
        });
    });
    it('CREATES a new Agent two', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(testdata[11])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          done();
        });
    });
    it('CHECKS if User already Exists', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signup')
        .send(testdata[5])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(409);
          done();
        });
    });
  });
  
  describe('/POST/signin routes', () => {
    it('ENABLE User login', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signin')
        .send(testdata[5])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.should.have.property('message').eql('signed in successfully');
          done();
        });
    });
    it('CHECK if User provided details are wrong', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signin')
        .send(testdata[4])
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message').eql('user doesnt exist please signup');
          done();
        });
    });
    it('CHECK if User provided details are wrong', (done) => {
        chai.request(app)
          .post('/api/v1/users/auth/signin')
          .send(testdata[12])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('wrong username or password');
            done();
          });
      });
    it('CHECK if User doesnt Exists', (done) => {
      chai.request(app)
        .post('/api/v1/users/auth/signin')
        .send(testdata[101])
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          done();
        });
    });
    it('CHECK if User doesnt Exists', (done) => {
        chai.request(app)
          .post('/api/v1/users/auth/signup')
          .send(testdata[13])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('firstName field  is invalid ');
            done();
          });
      });
      it('Method not allowed', (done) => {
        chai.request(app)
          .patch('/api/v1/users/auth/signup')
          .end((err, res) => {
            res.should.have.status(405);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(405);
            res.body.should.have.property('error').eql('Ooops this method is not allowed ');
            done();
          });
      });
  });
  