import { React, useState } from 'react';
import { cubicBezier, motion } from 'framer-motion';
import './Base.css';
import Card from '../Card/Card';
import Planning from '../Planning/Planning';

const Base = () => {

  // const [plannedTasks, setPlannedTasks] = useState([]);
  // const [noTasksAvailable, setNoTasksAvailable] = useState(false);

  const getAllTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || {};
    const importantUrgentTodos =
      todos.importantUrgent.filter((todo) => todo.type !== 'header') || [];
    const importantNotUrgentTodos =
      todos.importantNotUrgent.filter((todo) => todo.type !== 'header') || [];
    return { importantUrgentTodos, importantNotUrgentTodos };
  };

  const pickRandomTasks = (todos, count) => {
    // Only select non-header tasks
    const actionableTodos = todos.filter((todo) => todo.type !== 'header');
    const shuffled = [...actionableTodos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getPlannedTasks = () => {
    const { importantUrgentTodos, importantNotUrgentTodos } = getAllTodos();
    
    const plannedTasks = {
      importantUrgentTasks: [],
      importantNotUrgentTasks: []
    };
  
    let plannedUrgentTasks = pickRandomTasks(importantUrgentTodos, 3);
    let plannedNotUrgentTasks = [];
  
    if (plannedUrgentTasks.length < 3) {
      // If there are not enough important & urgent tasks, fill with important & not urgent tasks
      plannedNotUrgentTasks = pickRandomTasks(importantNotUrgentTodos, 3 - plannedUrgentTasks.length);
    } else {
      // If there are 3 or more important & urgent tasks, fill the rest with important & not urgent tasks
      plannedNotUrgentTasks = pickRandomTasks(importantNotUrgentTodos, 2);
    }
  
    plannedTasks.importantUrgentTasks = plannedUrgentTasks;
    plannedTasks.importantNotUrgentTasks = plannedNotUrgentTasks;
  
    // Ensure we don't have more than 5 tasks
    if (plannedTasks.importantUrgentTasks.length + plannedTasks.importantNotUrgentTasks.length > 5) {
      plannedTasks.importantNotUrgentTasks = plannedTasks.importantNotUrgentTasks.slice(0, 5 - plannedTasks.importantUrgentTasks.length);
    }
  
    return plannedTasks;
  };

  const handleHelpMePlan = () => {
    const plannedTasks = getPlannedTasks();
    if (!plannedTasks) {
      console.log("Add more important tasks to get help planning");
    } else {
      console.log(plannedTasks);
    }
  };

  return (
    <motion.div
      id="parent"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: cubicBezier(0.25, 1, 0.5, 1) }}
    >
      <div id="holder">
        <div className="action-button" onClick={handleHelpMePlan}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_769_46)">
              <path
                d="M8.5 18C9.05 18 9.5 17.55 9.5 17V7C9.5 6.45 9.05 6 8.5 6C7.95 6 7.5 6.45 7.5 7V17C7.5 17.55 7.95 18 8.5 18ZM12.5 22C13.05 22 13.5 21.55 13.5 21V3C13.5 2.45 13.05 2 12.5 2C11.95 2 11.5 2.45 11.5 3V21C11.5 21.55 11.95 22 12.5 22ZM4.5 14C5.05 14 5.5 13.55 5.5 13V11C5.5 10.45 5.05 10 4.5 10C3.95 10 3.5 10.45 3.5 11V13C3.5 13.55 3.95 14 4.5 14ZM16.5 18C17.05 18 17.5 17.55 17.5 17V7C17.5 6.45 17.05 6 16.5 6C15.95 6 15.5 6.45 15.5 7V17C15.5 17.55 15.95 18 16.5 18ZM19.5 11V13C19.5 13.55 19.95 14 20.5 14C21.05 14 21.5 13.55 21.5 13V11C21.5 10.45 21.05 10 20.5 10C19.95 10 19.5 10.45 19.5 11Z"
                fill="#333333"
              />
            </g>
            <defs>
              <clipPath id="clip0_769_46">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>help me plan</p>
        </div>
        <div id="base" className="container">
          <div id="container-one">
            <Card
              identifier={'card-one'}
              blockColor="#791616"
              path="/todos"
              priority="Important & urgent"
              category="importantUrgent"
              priorityNumber="1"
            />
            <Card
              identifier={'card-four'}
              blockColor="#486B7F"
              path="/todos"
              priority="Not important & urgent"
              category="notImportantUrgent"
              priorityNumber="3"
            />
          </div>
          <div id="container-two">
            <Card
              identifier={'card-two'}
              blockColor="#4D6A65"
              path="/todos"
              priority="Important & not urgent"
              category="importantNotUrgent"
              priorityNumber="2"
            />
            <Card
              identifier={'card-three'}
              blockColor="#767676"
              path="/todos"
              priority="Not important & not urgent"
              category="notImportantNotUrgent"
              priorityNumber="4"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Base;
