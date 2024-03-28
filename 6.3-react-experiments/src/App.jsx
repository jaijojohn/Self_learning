import {useMemo, useEffect,useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [exchangeData1,setExchange1] = useState({});
  const [exchangeData2,setExchange2] = useState({});
  const [bankData,setBank] = useState({});
  console.log("hi there app rerenders")

    useEffect(function(){
      setExchange1({returns :100})
  },[])
  useEffect(function(){
      setExchange2({returns :100})
  },[])

  useEffect(function(){
    setTimeout(function(){
      setBank({ income :100})
    },5000)
  },[])

  const cryptoreturns = useMemo(()=>{
    console.log("use memo executed")
    return (exchangeData1.returns+exchangeData2.returns);
  },[exchangeData1,exchangeData2])
  
  
  
  const incomeTax = (bankData.income + cryptoreturns)*0.3;
  return (
    <div>
      hi there the income tax returns is {incomeTax}
    </div>
  )
}

export default App
