const axios = require('axios');


const apiKey = 'd83219af3bc7abe201e3651f04d9b4fd-5e3f36f5-d8746cc4';
const domain = 'sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org';
const mailgunApiUrl = `https://api.mailgun.net/v3/${domain}/messages`;

const sendEmail = async () => {
  const emailData = {
    from: 'Your Website <clementine@your-mailgun-domain>',
    to: 'recipient@example.com',
    subject: 'Clementine Registration',
    text: 'Please follow the link below to register',
  };

  try {
    const response = await axios.post(mailgunApiUrl, emailData, {
      auth: {
        username: 'api',
        password: apiKey,
      },
    });
    console.log('Email sent successfully: ', response.data);
  } catch (error) {
    console.error('Error sending email: ', error.message);
  }
};

const recipientEmail = 'recipient@example.com';
sendEmail(recipientEmail);
