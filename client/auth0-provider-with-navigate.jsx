import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import.meta.env;

export const Auth0ProviderWithNavigate = ({ children }) => {
	const navigate = useNavigate();

	const domain = 'us.auth0.com';
	const clientId = '';
	const redirectUri = 'http://localhost:3000/landlord-dashboard';

	const onRedirectCallback = (appState) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	if (!(domain && clientId && redirectUri)) {
		return null;
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: redirectUri,
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

Auth0ProviderWithNavigate.propTypes = {
	children: PropTypes.node, // This line properly validates the 'children' prop as a React node
};
