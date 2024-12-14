import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ViewerPage from "./components/ViewerPage";
import BloggerPage from "./components/BloggerPage";
import AdminPage from "./components/AdminPage";
import MainPage from "./components/MainPage";
import SecondPage from "./components/SecondPage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return <Element />;
};

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Main</Link>
      <Link to="/second" style={{ marginRight: "15px" }}>Second Page</Link>
      
      {user ? (
        <>
          {(user.type === 'VIEWER') && (<Link to="/viewer" style={{ marginRight: "15px" }}>Viewer</Link>)}
          
          {(user.type === 'BLOGGER') && (<Link to="/blogger" style={{ marginRight: "15px" }}>Blogger</Link>)}

          {user.type === 'POSTER' && (<Link to="/admin" style={{ marginRight: "15px" }}>Admin</Link> )}

        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/signup" style={{ marginRight: "15px" }}>Sign Up</Link>
        </>
      )}
    </nav>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected Routes */}
      <Route 
        path="/viewer" 
        element={
          <ProtectedRoute 
            element={ViewerPage} 
            allowedRoles={['VIEWER', 'BLOGGER', 'ADMIN']} 
          />
        } 
      />
      <Route 
        path="/blogger" 
        element={
          <ProtectedRoute 
            element={BloggerPage} 
            allowedRoles={['BLOGGER', 'ADMIN']} 
          />
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute 
            element={AdminPage} 
            allowedRoles={['ADMIN']} 
          />
        } 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navigation />
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;