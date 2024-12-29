import React, { useState, useEffect, useRef, FC } from 'react'; // Make sure to import useEffect
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo
} from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import './Page.css';
import Todos from '../Todos/Todos.tsx';
import { initialTodos } from '../../data';

const Page: FC = () => {
  const location = useLocation();
  const { todoCategory } = location.state || {
    todoCategory: 'importantUrgent',
  };

  const getInitialTodos = () => {
    const savedTodos: string | null = localStorage.getItem('todos');
    if (savedTodos) return JSON.parse(savedTodos);
    return initialTodos;
  };

  type TodosObject = {
    [category: string]: {
      type?: 'header';
      isChecked: boolean;
      id: string;
      text: string;
      isCountingDown: boolean;
    }[];
  };

  type Countdowns = {
    [todoId: string]: number;
  };

  const [todos, setTodos] = useState<TodosObject>(getInitialTodos);
  const [currentCategory, setCurrentCategory] = useState<string>(todoCategory);
  const [editingId, setEditingId] = useState<string>('');
  const [editingText, setEditingText] = useState<string>('');
  const [countdowns, setCountdowns] = useState<Countdowns>({});
  const timeoutRefs = useRef({});
  const currentCategoryRef = useRef<string>(currentCategory);
  const lastEnterTimeRef = useRef(0);

  const priorityConfig = {
    importantUrgent: { color: '#791616', priorityText: 'Important & Urgent' },
    importantNotUrgent: {
      color: '#4D6A65',
      priorityText: 'Important & Not Urgent',
    },
    notImportantUrgent: {
      color: '#486B7F',
      priorityText: 'Not Important & Urgent',
    },
    notImportantNotUrgent: {
      color: '#767676',
      priorityText: 'Not Important & Not Urgent',
    },
  };

  const { color, priorityText } = priorityConfig[currentCategory];

  // Update the ref whenever the currentCategory changes
  useEffect(() => {
    currentCategoryRef.current = currentCategory;
  }, [currentCategory]);

  // useEffect to update localStorage when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the currently focused element is an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        // If so, don't switch categories
        return;
      }

      const categoryMap = {
        Digit1: 'importantUrgent',
        Digit2: 'importantNotUrgent',
        Digit3: 'notImportantUrgent',
        Digit4: 'notImportantNotUrgent',
      };

      const newCategory = categoryMap[event.code];

      // Since you're using currentCategoryRef in other parts,
      // ensure consistency by referring to currentCategoryRef for the current state
      if (newCategory && newCategory !== currentCategoryRef.current) {
        setCurrentCategory(newCategory);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []); // Dependencies are not needed since we're using refs

  const handlePriorityChange = (newCategory) => {
    setCurrentCategory(newCategory);
  };

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
        [currentCategoryRef.current]: [
          newTodo,
          ...prevTodos[currentCategoryRef.current],
        ],
      };
      // Asynchronously update localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    handleEdit(newTodo);
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
    setEditingId('');
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const boxShadowArray = {
    importantUrgent: '-10px 10px 100px rgba(121, 22, 22, 0.14)',
    importantNotUrgent: '-10px 10px 100px rgba(22, 117, 100, 0.17)',
    notImportantUrgent: '-10px 10px 100px rgba(17, 87, 128, 0.17)',
    notImportantNotUrgent: '-10px 10px 100px rgba(75, 75, 75, 0.17)',
  };

  return (
    <motion.div id="page-container">
      <motion.div
        style={{ y, opacity }} // apply the dynamic values
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
      >
        <motion.div
          className="page-background"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.2, bounce: 0 }}
        ></motion.div>
        <motion.div
          className="page-background-logo"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 2, bounce: 0 }}
        >
          dieter
        </motion.div>
        <div style={{ boxSizing: 'border-box' }}>
          <Link id="streamline-logo" to={'/'}>
            <motion.button
              id="streamline-button"
              initial={{ opacity: 0, y: 11 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 3, bounce: 0.25 }}
              whileHover={{
                scale: 1.07,
                transition: { duration: 0.1 },
              }}
            >
              dieter
            </motion.button>
          </Link>
          <motion.div
            className="page"
            initial={{ opacity: 0, scale: 0.9, y: 20}}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{type: "spring", duration: 1.85, bounce: 0}}
            style={{ boxShadow: boxShadowArray[currentCategory] }}
          >
            <div
              className="page-color-block"
              style={{ backgroundColor: color }}
            >
                          <div id="grab-handle"></div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={priorityText}
                  className="priority-text"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{type: "spring", duration: 0.25, bounce: 0}}
                  exit={{ opacity: 0, y: 5 }}
                >
                  {priorityText}
                </motion.p>
              </AnimatePresence>
              <motion.div id="priority-buttons">
                <button
                  onClick={() => handlePriorityChange('importantUrgent')}
                  className="priority-button"
                  style={{
                    opacity: currentCategory === 'importantUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  1
                </button>
                <button
                  onClick={() => handlePriorityChange('importantNotUrgent')}
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'importantNotUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  2
                </button>

                <button
                  onClick={() => handlePriorityChange('notImportantUrgent')}
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'notImportantUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  3
                </button>

                <button
                  onClick={() => handlePriorityChange('notImportantNotUrgent')}
                  className="priority-button"
                  style={{
                    opacity:
                      currentCategory === 'notImportantNotUrgent' ? 0.75 : 1,
                    color: color,
                  }}
                >
                  4
                </button>

                <button
                  className="priority-button"
                  onClick={addTodo}
                  style={{ color: color }}
                >
                  +
                </button>
              </motion.div>
            </div>
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
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
