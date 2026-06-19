require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Connection failed:', error.message);
    } else {
        console.log('✅ Gmail connected successfully!');
    }
});

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Test Email',
    text: 'If you see this, Nodemailer is working!'
}).then(() => {
    console.log('✅ Test email sent! Check your inbox.');
}).catch((err) => {
    console.log('❌ Send failed:', err.message);
});