import "./App.css";
import SignUp from "./components/pages/sginup/index";
import SignIn from "./components/pages/sginin/index";
import Dashboard from "./components/pages/dashboard/index";
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("userDetails");

  React.useEffect(() => {
    if (!storedData) {
      navigate("/signin");
    }
  }, [storedData, navigate]);

  return storedData ? children : null; // Only render children if user is authenticated
};

function App() {
  const storedData = localStorage.getItem("userDetails");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={storedData ? <Dashboard /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
