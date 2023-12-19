import reactLogo from "./assets/react.svg";
import clementineLogo from "../public/clementine.png";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const { logout, isAuthenticated } = useAuth0();

  const createCustomer = () => {
    getAccessTokenSilently().then((token) => {
      console.log(token);
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={clementineLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Clementine</h1>
      <div className="card">
        !isAuthenticated && (
        <button onClick={() => logout()}>sign in</button>)
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </>
  );
}

export default App;
