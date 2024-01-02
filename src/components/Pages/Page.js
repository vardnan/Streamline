import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Page.css';
import Todos from '../Todos/Todos';

const Page = () => {
  const location = useLocation();
  const { color, priorityText } = location.state;

  const [todos, setTodos] = useState([
    { id: Math.random(), text: 'Buy groceries' },
    { id: Math.random(), text: 'Schedule meeting' },
    { id: Math.random(), text: 'Read book' },
  ]);

  const addTodo = () => {
    const newTodo = { id: Math.random(), text: 'New thing to do' };
    setTodos([...todos, newTodo]);
  };

  return (
    <div id="page-container">
      <Link id="streamline-logo" to={'/'}>
        Streamline
      </Link>
      <div className="page">
        <div className="page-color-block" style={{ backgroundColor: color }}>
          <p className="priority-text">{priorityText}</p>
          <div id="priority-buttons">
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Important & urgent' }}
            >
              <button className="priority-button">1</button>
            </Link>
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Important & not urgent' }}
            >
              <button className="priority-button">2</button>
            </Link>
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Not important & urgent' }}
            >
              <button className="priority-button">3</button>
            </Link>
            <Link
              to={'/todos'}
              state={{
                color: color,
                priorityText: 'Not important & not urgent',
              }}
            >
              <button className="priority-button">4</button>
            </Link>
            <button className="priority-button" onClick={addTodo}>
              +
            </button>
          </div>
        </div>
        <Todos todos={todos} />
      </div>
    </div>
  );
};

export default Page;
