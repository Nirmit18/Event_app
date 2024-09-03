
import './App.css';
import Footer from './components/Footer';

import Signin from './components/SignIn';
import SignUp from './components/SignUp';
import Create from './pages/Create';
import { lazy, Suspense } from 'react';


import Home from './pages/Home';
// import ViewEvents from './pages/ViewEvents';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from './components/Loader';

const ViewEvents=lazy(()=>
new Promise(resolve=>{
  setTimeout(()=>resolve(import("./pages/ViewEvents")),
  2000);
}))

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<Signin />} />

      <Route path="/viewevents" element={
        <Suspense fallback = {<div className='flex justify-center items-center  min-h-screen '><Loader /></div>}><ViewEvents /></Suspense>
      } />
      
      
      
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
