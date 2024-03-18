import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./pages/posts/Post";
import Posts from "./pages/posts/Posts";
import Account from "./pages/users/Account";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import Register from "./pages/users/Register";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { hasAuthenticated } from './services/AuthApi'
import Auth from "./contexts/Auth";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}} >
      <Router>
        <div className="container-fluid">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <AuthenticatedRoute path="/account" element={<Account />} />
            <AuthenticatedRoute path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </Auth.Provider>
  );
}

export default App;