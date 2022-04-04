import { Layout, Typography, Space } from "antd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Exchanges from "./components/Exchanges";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import Login from "./components/Login";
import {auth} from './firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import Footer from "./components/Footer";

function App() {

  const [user, loading] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>

      {!user ? <Login/> :

      <div className="main flex" >
          <div className="routes">
            <div className="navbar">
              <Navbar />
            </div>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route  path="/crypto/:coinId" element={<CryptoDetails/>} />
              <Route exact path="/news" element={<News />} />
            </Routes>
            <Footer/>
          </div>

          
        </div>}
      </BrowserRouter>
    </div>
      
    
        
  );
}

export default App;
