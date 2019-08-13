import chai from 'chai';
import chaiHttp from 'chai-http';
import { validation } from '../api/data/data';
import app from "../index";

const should = chai.should();

chai.use(chaiHttp);

describe('/POST/signup routes', () => {
    it('CHECK alphabetic', (done) => {
      chai.request(app)
        .post('/api/v2/users/auth/signup')
        .send(validation[0])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('message').eql('firstName should be alphabetic');
          done();
        });
    });
    it('CHECK minimum characters', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[1])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('firstName should be greater than 1');
            done();
          });
      });

      it('CHeck ', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[2])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('email is invalid');
            done();
          });
      });

      it('CHECK maximum characters', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[3])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('phoneNumber should be less than 15');
            done();
          });
      });

      it('CHECK for numeric ', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[4])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('phoneNumber should be numeric');
            done();
          });
      });

      it('CHECK alphanumeric', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[5])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('address should be alphanumeric');
            done();
          });
      });

      it('TEST string', (done) => {
        chai.request(app)
          .post('/api/v2/users/auth/signup')
          .send(validation[6])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('firstName should be a string');
            done();
          });
      });

  });
  