import React, { Fragment, useState, useEffect } from 'react';
import ListTodo from './components/ListToDo';
import InputTodo from './components/inputTodoo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to delete a todo by ID
  const deleteTodo = async (id) => {
    try {
      await fetch(`/todos/${id}`, {
        method: 'DELETE',
      });
      // Filter out the deleted todo from the todos array
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Fragment>
      <InputTodo onAddTodo={fetchTodos} />
      <ListTodo todos={todos} onDelete={deleteTodo} />
    </Fragment>
  );
}

export default App;
