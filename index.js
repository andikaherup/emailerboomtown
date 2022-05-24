const express = require('express')
const app = express()
const nodemailer = require('nodemailer').mail
const cors = require('cors')
app.use(cors({ origin: true }))
app.use(express.json())
app.listen(3000, () => console.log("RUNNIING"))
app.options('*', cors())
app.post('/contact', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  await nodemailer({
    from: req.body.email,
    to: 'sales@carblicity.com',
    subject: req.body.subject,
    text: req.body.message || 'No message',
    html: req.body.message || 'No message'
  })
  res.send('success')
})
