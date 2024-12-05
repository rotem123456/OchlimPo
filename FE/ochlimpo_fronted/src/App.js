import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage.js";
import SecondPage from "./components/SecondPage.js";
import Login from "./components/LoginPage.js";
import "./App.css";

function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<MainPage />} />
       <Route path="/second" element={<SecondPage />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </BrowserRouter>
 );
}

export default App;