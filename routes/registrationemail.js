export async function sendEmail(toEmail) {
  const apiKey = 'd83219af3bc7abe201e3651f04d9b4fd-5e3f36f5-d8746cc4';
  const fromEmail = 'Excited User <mailgun@sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org>';
  const subject = 'Welcome to Clementine';
  const text = 'Congratulations on scoring your new place! Follow this link to access Clementine: The secure rent payment application - localhost:3000/register/user';

  const mailgunEndpoint = 'https://api.mailgun.net/v3/sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org/messages';

  const formData = new FormData();
  formData.append('from', fromEmail);
  formData.append('to', toEmail);
  formData.append('subject', subject);
  formData.append('text', text);

  try {
    const response = await fetch(mailgunEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



/*const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const apiKey = 'c48fc71502cd7874346510874d9cb004-5e3f36f5-62db60c2';
let data = new FormData();
data.append('from', '\'clementine@sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org\'');
data.append('to', '\'garrett.boscoe@gmail.com\'');
data.append('subject', '\'Hello\'');
data.append('text', '\'Testing some Mailgun awesomeness!\'');

let config = {
  method: 'post',
  url: 'https://api.mailgun.net/v3/sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org/messages',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    ...data.getHeaders(),
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


/*
const axios = require('axios');

const apiKey = 'd83219af3bc7abe201e3651f04d9b4fd-5e3f36f5-d8746cc4';
const domain = 'sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org';
const mailgunApiUrl = `https://api.mailgun.net/v3/${domain}/messages`;

const sendEmail = async (recipientEmail) => {
  const emailData = {
    from: 'mailgun@sandbox5ebc1c78dc6c4810bcd5a0473c27efc7.mailgun.org',
    to: recipientEmail,
    subject: 'Clementine Registration',
    text: 'Please follow the link below to register'
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

const recipientEmail = 'garrett.boscoe@gmail.com'; // Update recipient email here
sendEmail(recipientEmail);*/