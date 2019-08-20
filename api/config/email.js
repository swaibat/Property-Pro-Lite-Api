var mailOptions = {
    from: 'rumbiihas@gmail.com',
    to: 'rswaib@gmail.com',
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

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rumbiihas@gmail.com',
      pass: 'Kanyanyama01'
    }
  });

  export{transporter,mailOptions}