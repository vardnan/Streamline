import React, { useState, useEffect, useRef } from 'react'; // Make sure to import useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import { useLocation, Link } from 'react-router-dom';
import {
  motion,
  cubicBezier,
  AnimatePresence,
  easeInOut,
  easeIn,
} from 'framer-motion';
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
  const [currentCategory, setCurrentCategory] = useState(
    todoCategory ? todoCategory : 'importantUrgent'
  );
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [countdowns, setCountdowns] = useState({});
  const timeoutRefs = useRef({});
  const currentCategoryRef = useRef(currentCategory);
  const lastEnterTimeRef = useRef(null);

  // Update the ref whenever the currentCategory changes
  useEffect(() => {
    currentCategoryRef.current = currentCategory;
  }, [currentCategory]);


  // useEffect to update localStorage when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (todoId) => {
    setTodos((currentTodos) => {
      const updatedTodos = { ...currentTodos };
      updatedTodos[currentCategory] = updatedTodos[currentCategory].filter(
        (t) => t.id !== todoId
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });

    // Cleanup timeout reference
    if (timeoutRefs.current[todoId]) {
      clearTimeout(timeoutRefs.current[todoId]);
      delete timeoutRefs.current[todoId];
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        const now = Date.now();
        const timeSinceLastEnter = now - (lastEnterTimeRef.current || 0);

        // If the time since the last Enter key press is less than 500 milliseconds
        if (timeSinceLastEnter < 400) {
          // Consider this a double click
          addTodo();
        }

        // Update the last Enter time
        lastEnterTimeRef.current = now;
      }
    };

    // Attach the event listener to the window object.
    window.addEventListener('keydown', handleKeyDown);

    // Return a cleanup function to remove the event listener.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const initiateCountdown = (todoId) => {
    if (timeoutRefs.current[todoId]) {
      clearTimeout(timeoutRefs.current[todoId]);
    }

    let countdown = 2;
    setCountdowns((prev) => ({ ...prev, [todoId]: countdown }));
    const intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(intervalId);
        deleteTodo(todoId);
      } else {
        setCountdowns((prev) => ({ ...prev, [todoId]: countdown }));
      }
    }, 1000);

    timeoutRefs.current[todoId] = intervalId;
  };

  const checkTodo = (todoId) => {
    setTodos((currentTodos) => {
      const updatedTodos = { ...currentTodos };
      const todoIndex = updatedTodos[currentCategory].findIndex(
        (t) => t.id === todoId
      );

      if (todoIndex > -1) {
        const todo = updatedTodos[currentCategory][todoIndex];
        todo.isChecked = !todo.isChecked;

        if (todo.isChecked) {
          initiateCountdown(todoId);
        } else {
          clearInterval(timeoutRefs.current[todoId]);
          delete timeoutRefs.current[todoId];
          setCountdowns((prev) => {
            const newState = { ...prev };
            delete newState[todoId];
            return newState;
          });
        }
      }

      return updatedTodos;
    });
  };

  const addTodo = () => {
    const newTodo = {
      isChecked: false,
      id: uuidv4(),
      text: 'New thing to do',
      isCountingDown: false,
    };
  
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        [currentCategoryRef.current]: [newTodo, ...prevTodos[currentCategoryRef.current]],
      };
      // Asynchronously update localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
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
    setEditingText(todo.text === 'New thing to do' ? '' : todo.text);
  };

  const handleSave = (id) => {
    console.log('Before saving, current todos:', todos);
    console.log('Current category:', currentCategory);

    const updatedTodosForCategory = todos[currentCategory].map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText || 'New thing to do' };
      }
      return todo;
    });

    const updatedTodos = {
      ...todos,
      [currentCategory]: updatedTodosForCategory,
    };

    setTodos(updatedTodos);
    setEditingId(null);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  return (
    <motion.div id="page-container">
      <div style={{ boxSizing: 'border-box' }}>
        <Link id="streamline-logo" to={'/'}>
          <motion.button
            id="streamline-button"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, type: easeIn }}
            whileHover={{
              scale: 1.06,
              transition: { duration: 0.1, delay: 0 },
            }}
          >
            home
          </motion.button>
        </Link>
        <motion.div
          className="page"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: cubicBezier(0.25, 1, 0.5, 1) }}
        >
          <div className="page-color-block" style={{ backgroundColor: color }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={priorityText}
                className="priority-text"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: cubicBezier(0.25, 1, 0.5, 1),
                  duration: 0.15,
                }}
                exit={{ opacity: 0, y: 5 }}
              >
                {priorityText}
              </motion.p>
            </AnimatePresence>
            <motion.div id="priority-buttons">
              <Link
                to={'/todos'}
                state={{ color: '#791616', priorityText: 'Important & urgent' }}
                onClick={() => setCurrentCategory('importantUrgent')}
              >
                <button
                  className="priority-button"
                  style={{
                    opacity: currentCategory === 'importantUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  1
                </button>
              </Link>
              <Link
                to={'/todos'}
                state={{
                  color: '#4D6A65',
                  priorityText: 'Important & not urgent',
                }}
                onClick={() => setCurrentCategory('importantNotUrgent')}
              >
                <button
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'importantNotUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  2
                </button>
              </Link>
              <Link
                to={'/todos'}
                state={{
                  color: '#486B7F',
                  priorityText: 'Not important & urgent',
                }}
                onClick={() => setCurrentCategory('notImportantUrgent')}
              >
                <button
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'notImportantUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  3
                </button>
              </Link>
              <Link
                to={'/todos'}
                state={{
                  color: '#767676',
                  priorityText: 'Not important & not urgent',
                }}
                onClick={() => setCurrentCategory('notImportantNotUrgent')}
              >
                <button
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'notImportantNotUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  4
                </button>
              </Link>
              <button
                className="priority-button"
                onClick={addTodo}
                style={{ color: color }}
              >
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
              countdowns={countdowns}
            />
          </DragDropContext>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;
