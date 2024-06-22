import React from "react";
import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Radio from "../component/Radio/Radio";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import FavoriteContextProvider from "../contexts/FavoriteContext";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <FavoriteContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route path="/radio" element={<Radio />} />{" "}
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </FavoriteContextProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
