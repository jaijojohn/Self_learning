import {useState} from "react"


function Todo(props){
  return(
  <div>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>
  </div>)

}

function  App() {
  const [todos,setTodos] = useState([
    {
      title:"gym"
      ,description:"got to gym from 7 to 9"
      ,completed:false
    },
    {
      title:"study dsa"
      ,description:"study from 9 to 11"
      ,completed:true
    }
  ]);

  
function addTodo(){
  setTodos([...todos,{
    title:"new todos"
    ,description : "new Description"
  }])

}
  return (
    <div>
    
     <button onClick={addTodo}>add todos</button>
     {
      todos.map(function(todo){
        return (
          <Todo title= {todo.title} description = {todo.description}></Todo>
        )
      })
     }
    </div>
  )
}


export default App
