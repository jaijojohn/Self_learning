import { useState,Suspense,lazy } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
//import {Dashboard} from './components/Dashboard'
//import {Landing} from './components/Landing'
const Dashboard = lazy(()=> import('./components/Dashboard.jsx'));

const Landing = lazy(()=> import('./components/Landing.jsx'));

function App() {

  
  return (
    <div>
      
      <div>
    <BrowserRouter>
    <Appbar />
    <Routes>
      <Route path="/dashboard" element ={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
      <Route path="/" element ={<Suspense fallback={"Loading..."}><Landing /></Suspense>} />
      
    </Routes>

    </BrowserRouter>
    </div>
    </div>
  )
}


function Appbar(){
  const navigate = useNavigate();
return (
  <div>
      <button onClick={()=>{
        navigate("/");
      }
      }>Landing</button>
        <button onClick={()=>{
          navigate("/Dashboard");
        }}>Dashboard</button>

      </div>
)
}

export default App
