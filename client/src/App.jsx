import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import "./assets/clementinesv.svg";
import "./App.css";
import Dashboard from "./pages/tenantsPages/Dashboard";
import LDashboard from "./pages/landlordPages/LDashboard";
import WelcomePage from "./pages/WelcomePage";


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(isAuthenticated)

  return (
    <>
      <Auth0Provider
        domain="dev-wyvx8c2jswjwvuxo.us.auth0.com"
        clientId="HSjhZMZWxMGNxjM5DtBD5hTxHH0Fm0ql"
        authorizationParams={{
          redirect_uri: "http://localhost:3000/landlord-dashboard"
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            isAuthenticated && (
            <Route path="/landlord-dashboard" element={<LDashboard />} />
            <Route path="/tenant-dashboard" element={<Dashboard />} />
            )
          </Routes>
        </Router>
      </Auth0Provider>
    </>
  );
}

export default App;
