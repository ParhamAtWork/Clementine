/* eslint-disable no-unused-vars */
import {
	BrowserRouter as Router,
	Route,
	Routes,
	BrowserRouter,
	json,
} from 'react-router-dom';
import axios from 'axios';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Auth0Provider } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './assets/clementinesv.svg';
import './App.css';
import Dashboard from './pages/tenantsPages/Dashboard';
import LDashboard from './pages/landlordPages/LDashboard';
import WelcomePage from './pages/WelcomePage';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	console.log(isAuthenticated);
	const tenantKey = user;
	console.log('tenantKey: ', tenantKey?.nickname);

	return (
		<>
			<Routes>
				<Route
					exact
					path='/'
					element={<WelcomePage />}
				/>
				isAuthenticated && (
				<Route
					path='/landlord-dashboard'
					element={<LDashboard />}
				/>
				<Route
					path='/tenant-dashboard'
					element={<Dashboard />}
				/>
				)
			</Routes>
		</>
	);
}

export default App;
