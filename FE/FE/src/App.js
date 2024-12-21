import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ViewerPage from "./components/ViewerPage/ViewerPage";
import BloggerPage from "./components/BloggerPage/BloggerPage";
import AdminPage from "./components/AdminPage/AdminPage";
import MainPage from "./components/MainPage/MainPage";
import SecondPage from "./components/SecondPage/SecondPage";
import Login from "./components/LoginPage/LoginPage";
import SignUp from "./components/LoginPage/SignUpPage";
import Weather from "./components/WeatherPage/weather";
import "./App.css";


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
          {/*FOR DEBUGGING uncomment */}
          <Link to="/viewer" style={{ marginRight: "15px" }}>Viewer</Link>
          <Link to="/blogger" style={{ marginRight: "15px" }}>Blogger</Link>
          <Link to="/admin" style={{ marginRight: "15px" }}>Admin</Link>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/signup" style={{ marginRight: "15px" }}>Sign Up</Link>
          <Link to="/weather" style={{ marginRight: "15px" }}>Weather</Link>

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
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="/blogger" element={<BloggerPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/weather" element = {<Weather/>} />
      
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