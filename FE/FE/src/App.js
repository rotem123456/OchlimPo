import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewerPage from "./components/ViewerPage";
import BloggerPage from "./components/BloggerPage";
import AdminPage from "./components/AdminPage";
import MainPage from "./components/MainPage";
import SecondPage from "./components/SecondPage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import RecipeUpload from "./components/UploadRecipesPage"
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/" style={{ marginRight: "15px" }}>
            Main
          </Link>
          <Link to="/second" style={{ marginRight: "15px" }}>
            Second Page
          </Link>
          <Link to="/viewer" style={{ marginRight: "15px" }}>
            Viewer
          </Link>
          <Link to="/blogger" style={{ marginRight: "15px" }}>
            Blogger
          </Link>
          <Link to="/admin" style={{ marginRight: "15px" }}>
            Admin
          </Link>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginRight: "15px" }}>
            Sign Up
          </Link>
          <Link to="/upload_recipes">
            upload recipes
          </Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
          <Route path="/blogger" element={<BloggerPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload_recipes" element={<RecipeUpload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;