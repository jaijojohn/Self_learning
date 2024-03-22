import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  let [count, setCount] = useState(0)
  let [inputvalue,setInputValue] =useState(0)

  let sum = useMemo(()=>{
    let finalsum = 0;
    console.log("use memo called")
    for(let i=0;i<=inputvalue;i++)
    {
      finalsum = finalsum+i;
    }
    return finalsum
  }
,[inputvalue]    
  )

  
  return (
    <div>
      <input id = "inputbox" type="textbox" placeholder="Enter n to get sum 1 to n"
      onChange={(e)=>{
        setInputValue(e.target.value)
      }}
      ></input>
      <br></br>
      <div>sum of 0 to {inputvalue} is {sum}</div>
      <button onClick={() => {
        setCount(++count)
      }}>Counter ({count})</button>
    </div>
  )
}

export default App
