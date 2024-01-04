import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './assets/clementinesv.svg';
import './App.css';
import Dashboard from './pages/tenantsPages/Dashboard';
import LDashboard from './pages/landlordPages/LDashboard';
import WelcomePage from './pages/WelcomePage';

function App() {
	const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();

	const location = useLocation(); // Get the current location

	useEffect(() => {
		if (!isLoading) {
			console.log('Auth State: ', { isAuthenticated, user });

			if (isAuthenticated) {
				console.log('tenantKey: ', user?.nickname);

				// Redirect based on the user's nickname or other criteria
				if (user?.nickname === 'bobby') {
					navigate('/tenant-dashboard');
				} else {
					navigate('/landlord-dashboard');
				}
			} else {
				// Only force login if the user is not on the home page or other public pages
				const publicPaths = ['/']; // Add other public paths as needed
				if (!publicPaths.includes(location.pathname)) {
					loginWithRedirect();
				}
			}
		}
	}, [isAuthenticated, user, isLoading, loginWithRedirect, location.pathname]);

	return (
		<>
			<Routes>
				<Route
					exact
					path='/'
					element={<WelcomePage />}
				/>
				<Route
					path='/landlord-dashboard'
					element={<LDashboard />}
				/>
				<Route
					path='/tenant-dashboard'
					element={<Dashboard />}
				/>
			</Routes>
		</>
	);
}

export default App;