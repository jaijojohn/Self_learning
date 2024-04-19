import { useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import {countAtom} from './store/atoms/count.jsx'
function App() {

  return (
    <div>
      <RecoilRoot>
      <Count/>
      </RecoilRoot>
    </div>
  )
}
function Count(){
  console.log("count re-render");
  return <div>
    <CountRender ></CountRender>
    <Button />
  </div>
}

function CountRender(){
  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
  }
function Button(){
  const [count,setCount] = useRecoilState(countAtom)
  return <div>
    <button onClick={()=>{
        setCount(count+1)
    }}> Increase Count
    </button>
    <button onClick={()=>{
      setCount(count-1)
    }}> Decrease Count
    </button>
    </div>

}

export default App
