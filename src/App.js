import React from 'react';
import Navbar from './my_components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Splash from './pages/splash';
import Login from './pages/login';
import AddIncome from './pages/addIncome';
import AddExpense from './pages/addExpense';
import PageNotFound from './pages/404';
import Footer from './my_components/footer';

// Check if the user is logged in
function loggedIn() {
  return !!localStorage.getItem('loginToken');
}
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={loggedIn() ? <Home /> : <Navigate to='/splash' />} />
          <Route path="/register" element={loggedIn() ? <Navigate to="/" /> : <Register />} />
          <Route path="/splash" element={loggedIn() ? <Navigate to="/" /> : <Splash />} />
          <Route path="/login" element={loggedIn() ? <Navigate to="/" /> : <Login />} />
          <Route path="/addIncome" element={loggedIn() ? <AddIncome /> : <Navigate to="/splash" />} />
          <Route path="/addExpense" element={loggedIn() ? <AddExpense /> : <Navigate to="/splash" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
