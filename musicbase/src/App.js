
import './App.css';
import React,{ Component } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Telugu from './pages/telugu';
import Admin from './pages/admin';
import Postcard from './pages/Postcard';

class App extends Component {
  render() {
      return (
          <>
            <Router>
          <Navbar />
          
               <Routes>
               <Route path="/" exact element={<Dashboard/>}/>
              <Route path="/findit" exact element={<Search/>}/> 
               {/* <Route path="/telugu" element={<Telugu/>}/> */}
               {/* <Route path="/audio" exact element={<Dashboard/>}/> */}
               <Route path="/upload" exact element={<Admin/>}/>  
             </Routes>
              
         </Router>
     
          </>
         
      );
  }
}

export default App;




