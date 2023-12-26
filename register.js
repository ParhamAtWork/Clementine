import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Route to handle user invitation
app.post('/invite', async (req, res) => {
	const { email } = req.body;

	try {
		// Get Auth0 access token
		const tokenResponse = await axios.post(
			`https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token`,
			{
				client_id: 'pERLNKBQu6My2BO1JjwLjt01598HRECR',
				client_secret: 'SDJWwk2NQ3hy_qdxXIfoHESjo37GevULaq-K0IOgW0fYUsS3Ka17wleBd9sjHOUE',
				audience: `https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/`,
				grant_type: 'client_credentials',
			}
		);

		const { access_token } = tokenResponse.data;

		// Create user (adjust payload as needed)
		const userResponse = await axios.post(
			`https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/users`,
			{
				email,
				connection: 'Username-Password-Authentication',
				verify_email: false,
			},
			{
				headers: {
					authorization: `Bearer ${access_token}`,
				},
			}
		);

		// Send invitation email (adjust URL to the link you want the user to click)
		const ticketResponse = await axios.post(
			`https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/tickets/email-verification`,
			{
				user_id: userResponse.data.user_id,
				result_url:
					'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/after-confirmation',
			},
			{
				headers: {
					authorization: `Bearer ${access_token}`,
				},
			}
		);

		res.send({ invitationLink: ticketResponse.data.ticket });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
