const nodeMailer = require("nodemailer");
const sendEmail = async (req, res) => {
  const { email, companyName, username } = req.body;
  //   const username = "Shubham";
  console.log(req.body);
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: "ecommerce9559@gmail.com",
      pass: "SHUBHAM2@",
      //   user: process.env.SMTP_MAIL,
      //   pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOPtions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: `Regarding next round at ${companyName}`,
    html: `     
                <div >
                    <h2>Congratulations ${username} !  </h2>
                     <h6> <em>Your profile has been shortlisted in ${companyName} for next round.</em></h6>
                    <p style="text-align: center">You will be contacted by company for further communication </p>
                </div>
    `,
    // text: message,
  };

  transporter.sendMail(mailOPtions, function (error, info) {
    if (error) {
      return res.json({
        message: error.message,
      });
      //   console.log(error);
    }
    return res.json({
      message: "Mail has been send !",
      status: true,
    });
  });

  //   await transporter.sendMail(mailOPtions);
  //   return res.json({
  //     message: "Mail has been send !",
  //     status: true,
  //   });
};
module.exports = sendEmail;
