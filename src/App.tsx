import React from 'react';
import logo from './logo.svg';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Homepage from './pages/Homepage';
import ShowtimePage from './pages/Showtime'; 
import {BrowserRouter as Router, Route , Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
     
      <Router>
      <Routes>
        

       <Route path='/' element={ <Loginpage/>} />
       <Route path='/register' element={< Signuppage/>} />
       <Route path='/homepage' element={< Homepage/>} />
       <Route path="/showtime/:movieName" element={<ShowtimePage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;