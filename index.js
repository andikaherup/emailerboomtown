const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
const cors = require('cors')
app.use(cors({ origin: true }))
app.use(express.json())
app.listen(4000, () => {
})
app.options('*', cors())
const transporter = nodemailer.createTransport({
  port: 465,
  host: "mail.boomtownads.com",
  auth: {
      user: 'info@boomtownads.com',
      pass: 'V7c7Q64t4RaP7uDu',
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

app.post('/contact', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // await nodemailer({
  //   from: req.body.email,
  //   to: 'sales@carblicity.com',
  //   subject: req.body.subject,
  //   text: req.body.message || 'No message',
  //   html: req.body.message || 'No message'
  // })
  
    const mailData = {
        from: req.body.email,
        to: 'info@boomtownads.com',
        subject: req.body.subject,
        text: req.body.message || 'No message',
        html: req.body.message || 'No message'
    };

  await transporter.sendMail(mailData, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
});
})
