import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Compile, Events, Sun, UseStateFunction } from './comp/comp';
// import { ChakraProvider } from '@chakra-ui/react'

import { Signin } from './comp/signin/signin';
import { Signup } from './comp/signin/signup';
import { Update } from './comp/signin/update';
import { ForgotPassword } from './comp/signin/forgotpass';
import { StudentData } from './comp/students/student';
// import { Router } from 'express';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(JSON.parse)
root.render(
 <>
 
  <BrowserRouter>
  <Routes>
  <Route path="/signin" element={<Signin/>}></Route>
  <Route path="/signup" element={<Signup/>}></Route>
  <Route path="/update" element={<Update/>}></Route>
  <Route path="/student" element={<StudentData/>}></Route>
  {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
   
  </Routes>
  </BrowserRouter>
    {/* <ChakraProvider>
   <Signin/>
     
    </ChakraProvider>  */}
    
    
  
 </>
    
);

reportWebVitals();
