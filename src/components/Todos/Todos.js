import React from 'react';
import '../Pages/Page.css';

const Todos = ({ todos }) => {
  return (
    <div id="todos-container">
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <button className="todo-button"></button>
          <p className="todo-text">{todo.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
