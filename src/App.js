import logo from "./logo.svg";
import "./App.css";
import { Card } from "react-bootstrap";
import Router from "./router/router";
import { AuthProvider } from "./services/auth/context/AuthContext";
function App() {
  return (
    <>
    <AuthProvider>
    <Router />
    </AuthProvider>
    </>
  );
}

export default App;
