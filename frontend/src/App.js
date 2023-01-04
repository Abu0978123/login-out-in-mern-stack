import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Home/HomePage';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className='App'>

    <BrowserRouter>
    <Routes> 
      <Route exact path='/'
     element = {
        user && user._id ?  <Homepage setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>
      }
      >
         
      </Route>
      <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>

      {/* <Register/> */}
     {/* <Homepage/> */}
     {/* <Login/> */}
    </div>
  );
}

export default App;
