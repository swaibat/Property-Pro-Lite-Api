import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import errHandle from '../helpers/errors';
import dotenv from 'dotenv';
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rumbiihas@gmail.com',
    pass: 'Kanyanyama01'
  }
});

class Email{
  static passwordreset(req, res) {
        User.getUserByEmail(req.body.email)
        .then(e =>{
          if(!e.rows[0]) return res.status(404).send({status:404, message:'user with email not found'})
          var token = jwt.sign({email:e.rows[0].email}, process.env.appSecreteKey, { expiresIn: '24hr' });
          var mailOptions = {
            from: 'rumbiihas@gmail.com',
            to: e.rows[0].email,
            subject: 'Password Reset',
            html: `
              <!DOCTYPE html>
                <html>
                  <head>
                      <title>Forget Password Email</title>
                  </head>
                  <body>
                      <div>
                          <h3>Dear ${e.rows[0].firstname},</h3>
                          <p>You requested for a password reset, kindly use this <a href="http://localhost:3000/api/v2/users/auth/resetpassword/${e.rows[0].id}/${token}">link</a> to reset your password</p>
                          <br>
                          <p>Cheers!</p>
                      </div>  
                  </body>
                </html>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) return res.status(400).send({error:400, message:error.message})
              return res.status(200).send({status:200, message:`password reset instructions have been sent to ${e.rows[0].email}`,token})
          }); 
        })
  }

  static resetPass(req, res) {
    jwt.verify(req.params.token, process.env.appSecreteKey, (err, user) => {
      if (err) return errHandle(403, err.message.replace("jwt", "Reset Token"), res);
      User.resetPassword(bcrypt.hashSync(req.body.password, 10),user.email)
      .then(e =>{
          return res.status(200).send({status:200, message:'password update successful'})
      })
        
    });
  }

}

export default Email;
