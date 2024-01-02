/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./assets/clementinesv.svg";
import "./App.css";
import Dashboard from "./pages/tenantsPages/Dashboard";
import LDashboard from "./pages/landlordPages/LDashboard";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  console.log(isAuthenticated);
  const tenantKey = user;
  console.log(user)
  console.log("tenantKey: ", tenantKey?.nickname);

  // Check if the user is authenticated and if tenantKey?.nickname is "joseph.schmitt1"
  // TODO: CHANGE THIS TO BOBBY Chickennugget12!
  if (isAuthenticated && tenantKey?.nickname === "bobby") {
    // Redirect to /tenant-dashboard
    navigate('/tenant-dashboard');
  } else if (!isAuthenticated) {
	navigate('/')
  }

  return (
    <>
      <Routes>
        <Route exact path='/' element={<WelcomePage />} />
        <Route path='/landlord-dashboard' element={<LDashboard />} />
        <Route path='/tenant-dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
