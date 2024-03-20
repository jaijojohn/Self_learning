import { useState } from "react"
import React from "react"

function App() {  
  return <div>
  <CardWrapper>
      <TextComponent />
  </CardWrapper>
  </div>
}

function CardWrapper({children}){
  return <div style={{border: "2px solid black"}}>
    {children}
  </div>
}

function TextComponent(){
  return <div>
    hi from text comonent
  </div>
}
export default App
