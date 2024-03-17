import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CreateTodo} from './components/CreateTodo'
import { Todos } from './components/Todos'
import React, { useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([])

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        console.log(response.data)
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return(
    <div>
    <CreateTodo></CreateTodo>
    <Todos todos = {todos}></Todos>
    </div>
  )
}

export default App
