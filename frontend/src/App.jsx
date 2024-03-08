import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./components/Layout";
import InputCost from "./components/InputCost";
import Simulation from "./components/Simulation";
import LoginPage from "./Pages/LoginPage";
import { UserAuth } from "./context/AuthContext";


const App = () => {
  const { user, logout } = UserAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!user && <LoginPage onLogin={handleLogin} />}

      {user && (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inputcost" element={<InputCost />} />
            <Route path="/simulation" element={<Simulation />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
