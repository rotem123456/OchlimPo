import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewerPage from "./components/ViewerPage";
import BloggerPage from "./components/BloggerPage";
import AdminPage from "./components/AdminPage";
import MainPage from "./components/MainPage";
import SecondPage from "./components/SecondPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/viewer" style={{ marginRight: "15px" }}>
            Viewer
          </Link>
          <Link to="/blogger" style={{ marginRight: "15px" }}>
            Blogger
          </Link>
          <Link to="/admin" style={{marginRight: "15px"}}>
          Admin
          </Link>
          <Link to="/secondPage" style={{marginRight: "15px"}}>
          SecondPage
          </Link>
          <Link to="/mainPAge">MainPage</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/mainpage" element={<MainPage/>} />
          <Route path="/secondPage" element={<SecondPage/>}/>
          <Route path="/viewer" element={<ViewerPage />} />
          <Route path="/blogger" element={<BloggerPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
