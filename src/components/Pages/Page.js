import React, { useState, useEffect } from 'react'; // Make sure to import useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import { useLocation, Link } from 'react-router-dom';
import { motion, cubicBezier, AnimatePresence, easeInOut, easeIn } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import './Page.css';
import Todos from '../Todos/Todos';
import { initialTodos } from '../../data';

const Page = () => {
  const location = useLocation();
  const { color, priorityText, todoCategory } = location.state;

  const getInitialTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) return JSON.parse(savedTodos);
    return initialTodos;
  };

  // Corrected useState for currentCategory
  const [todos, setTodos] = useState(getInitialTodos);
  const [currentCategory, setCurrentCategory] = useState(todoCategory ? todoCategory : 'importantUrgent');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // useEffect to update localStorage when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const checkTodo = (todoId) => {
    const checkedTodos = todos[currentCategory].map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodos({
      ...todos,
      [currentCategory]: checkedTodos,
    });
  };

  // Add a new todo to the current category
  const addTodo = () => {
    const newTodo = {
      isChecked: false,
      id: uuidv4(),
      text: 'New thing to do',
    };

    const updatedTodos = {
      ...todos,
      [currentCategory]: [newTodo, ...todos[currentCategory]],
    };

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const categoryTodos = Array.from(todos[currentCategory]);
    const [reorderedItem] = categoryTodos.splice(result.source.index, 1);
    categoryTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos({
      ...todos,
      [currentCategory]: categoryTodos,
    });
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleSave = (id) => {
    console.log('Before saving, current todos:', todos);
    console.log('Current category:', currentCategory);

    const updatedTodosForCategory = todos[currentCategory].map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText };
      }
      return todo;
    });

    const updatedTodos = {
      ...todos,
      [currentCategory]: updatedTodosForCategory,
    };

    console.log('After saving, updated todos:', updatedTodos);
    setTodos(updatedTodos);
    setEditingId(null);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  return (
    <motion.div id="page-container">
      <div style={{boxSizing: "border-box"}}>
      <Link id="streamline-logo" to={'/'}>
        <motion.button
          id="streamline-button"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, type: easeIn }}
        >
          Streamline
        </motion.button>
      </Link>
      <motion.div
        className="page"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: cubicBezier(0.25, 1, 0.5, 1)}}
      >
        <div className="page-color-block" style={{ backgroundColor: color }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={priorityText}
              className="priority-text"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: cubicBezier(0.25, 1, 0.5, 1), duration: 0.15 }}
              exit={{ opacity: 0, y: 5 }}
            >
              {priorityText}
            </motion.p>
          </AnimatePresence>
          <motion.div id="priority-buttons">
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Important & urgent' }}
              onClick={() => setCurrentCategory('importantUrgent')}
            >
              <button className="priority-button" style={{ opacity: currentCategory === 'importantUrgent' ? 0.75 : 1 }}>1</button>
            </Link>
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Important & not urgent' }}
              onClick={() => setCurrentCategory('importantNotUrgent')}
            >
              <button className="priority-button" style={{ opacity: currentCategory === 'importantNotUrgent' ? 0.75 : 1 }}>2</button>
            </Link>
            <Link
              to={'/todos'}
              state={{ color: color, priorityText: 'Not important & urgent' }}
              onClick={() => setCurrentCategory('notImportantUrgent')}
            >
              <button className="priority-button" style={{ opacity: currentCategory === 'notImportantUrgent' ? 0.75 : 1 }}>3</button>
            </Link>
            <Link
              to={'/todos'}
              state={{
                color: color,
                priorityText: 'Not important & not urgent',
              }}
              onClick={() => setCurrentCategory('notImportantNotUrgent')}
            >
              <button className="priority-button" style={{ opacity: currentCategory === 'notImportantNotUrgent' ? 0.75 : 1 }}>4</button>
            </Link>
            <button className="priority-button" onClick={addTodo}>
              +
            </button>
          </motion.div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Todos
            key={currentCategory}
            todos={todos[currentCategory]}
            checkTodo={checkTodo}
            checkedColor={color}
            editingText={editingText}
            setEditingText={setEditingText}
            editingId={editingId}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </DragDropContext>
      </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;
