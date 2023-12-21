import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/clementinesv.svg';
import '../public/clementine.png';
import './App.css';
import Dashboard from './pages/tenantsPages/Dashboard';
import LDashboard from './pages/landlordPages/LDashboard';
import WelcomePage from './pages/WelcomePage';

function App() {
	return (
		<>
			<Router>
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
			</Router>
		</>
	);
}

export default App;
