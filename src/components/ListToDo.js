import React, { Fragment } from 'react';

const ListTodo = ({ todos, onDelete }) => {
  return (
    <Fragment>
      <h2>List of Todos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => onDelete(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
