import { React, useState } from 'react';
import { cubicBezier, motion, LayoutGroup, easeIn } from 'framer-motion';
import './Base.css';
import Card from '../Card/Card';
import PlannedTaskContainer from '../PlannedTaskContainer/PlannedTaskContainer';

const Base = () => {
  const [plannedTasks, setPlannedTasks] = useState([]);
  const [planTasks, setPlanTasks] = useState(false);

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

    // Prompt for more tasks if there are none in either category
    if (
      importantUrgentTodos.length === 0 &&
      importantNotUrgentTodos.length === 0
    ) {
      return 'Add more important tasks to get help planning';
    }

    // Initialize planned tasks
    const plannedTasks = {
      importantUrgentTasks: [],
      importantNotUrgentTasks: [],
    };

    // Fill the importantUrgentTasks array with up to 3 tasks if there are enough tasks available
    plannedTasks.importantUrgentTasks = pickRandomTasks(
      importantUrgentTodos,
      Math.min(3, importantUrgentTodos.length)
    );

    // Calculate how many tasks are still needed to reach 5
    let slotsNeeded = 5 - plannedTasks.importantUrgentTasks.length;

    // If important & urgent tasks are less than 3, we can take more important & not urgent tasks, otherwise, take up to 2
    if (importantUrgentTodos.length < 3) {
      plannedTasks.importantNotUrgentTasks = pickRandomTasks(
        importantNotUrgentTodos,
        slotsNeeded
      );
    } else {
      plannedTasks.importantNotUrgentTasks = pickRandomTasks(
        importantNotUrgentTodos,
        Math.min(2, slotsNeeded)
      );
    }

    // If we still haven't reached 5 tasks and there's space for more important & urgent tasks, add more.
    slotsNeeded =
      5 -
      (plannedTasks.importantUrgentTasks.length +
        plannedTasks.importantNotUrgentTasks.length);
    if (
      slotsNeeded > 0 &&
      importantUrgentTodos.length > plannedTasks.importantUrgentTasks.length
    ) {
      const additionalUrgentTasks = pickRandomTasks(
        importantUrgentTodos.filter(
          (task) => !plannedTasks.importantUrgentTasks.includes(task)
        ),
        slotsNeeded
      );
      plannedTasks.importantUrgentTasks.push(...additionalUrgentTasks);
    }

    return plannedTasks;
  };

  const handleHelpMePlan = () => {
    const tasks = getPlannedTasks();
    setPlannedTasks(tasks);
    setPlanTasks(true);
    // if (typeof tasks === 'string') {
    //   // // If tasks is a string, it means we need to add more important tasks
    //   // alert(tasks); // You could use a more sophisticated way of displaying this message
    // } else {
    //   setPlannedTasks(
    //     // tasks.importantUrgentTasks.concat(tasks.importantNotUrgentTasks)
    //     tasks
    //   );
    //   setPlanTasks(true);
    // }
  };

  const renderPlannedTasks = () => {
    if (typeof plannedTasks === 'string') {
      return <p style={{ fontSize: '1.5rem' }}>{plannedTasks}</p>;
    } else {
      return (
        <motion.div id="plannedTasks" layoutId="plannedTasks">
          {plannedTasks.importantUrgentTasks.length >= 1 && (
            <PlannedTaskContainer
              priorityLevel="important & urgent"
              priorityColour="#791616"
              priorityCategory="importantUrgentTasks"
              plannedTasks={plannedTasks}
              priorityNumber={1}
            />
          )}
          {plannedTasks.importantNotUrgentTasks.length >= 1 && (
            <PlannedTaskContainer
              priorityLevel="important & not urgent"
              priorityColour="#4D6A65"
              priorityCategory="importantNotUrgentTasks"
              plannedTasks={plannedTasks}
              priorityNumber={2}
            />
          )}
        </motion.div>
      );
    }
  };

  return (
    <motion.div id="parent">
      <motion.div
        className="background"
        initial={{ opacity: 1, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          type: cubicBezier(0.25, 1, 0.5, 1),
          delay: 0.2,
        }}
      ></motion.div>
      <motion.div
        className="background-logo"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: cubicBezier(0.25, 1, 0.5, 1),
          delay: 0.8,
        }}
      >
        dieter
      </motion.div>
      <motion.div
        id="holder"
        layout
        transition={{
          duration: 0.35,
          type: cubicBezier(0.25, 1, 0.5, 1),
        }}
      >
        <motion.div
          className="action-button"
          onClick={planTasks ? () => setPlanTasks(false) : handleHelpMePlan}
        >
          {planTasks ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clipPath="url(#clip0_769_330)">
                <path
                  d="M19.5 11H8.32998L13.21 6.11997C13.6 5.72997 13.6 5.08997 13.21 4.69997C12.82 4.30997 12.19 4.30997 11.8 4.69997L5.20998 11.29C4.81998 11.68 4.81998 12.31 5.20998 12.7L11.8 19.29C12.19 19.68 12.82 19.68 13.21 19.29C13.6 18.9 13.6 18.27 13.21 17.88L8.32998 13H19.5C20.05 13 20.5 12.55 20.5 12C20.5 11.45 20.05 11 19.5 11Z"
                  fill="#333333"
                />
              </g>
              <defs>
                <clipPath id="clip0_769_330">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clipPath="url(#clip0_769_46)">
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
          )}
          <p>{planTasks ? 'go back' : 'help me plan'}</p>
        </motion.div>
        <motion.div id="base" className="container">
          {planTasks ? (
            <div
              style={{
                boxSizing: 'border-box',
                width: '100%',
                padding: '0rem 2rem 0rem 2rem',
              }}
            >
              {renderPlannedTasks()}
            </div>
          ) : (
            <>
              <LayoutGroup layoutId="cards">
                <motion.div id="container-one">
                  <Card
                    identifier={'card-one'}
                    blockColor="#791616"
                    path="/todos"
                    priority="Important & urgent"
                    category="importantUrgent"
                    priorityNumber="1"
                    animationDelay={0.5}
                  />
                  <Card
                    identifier={'card-four'}
                    blockColor="#486B7F"
                    path="/todos"
                    priority="Not important & urgent"
                    category="notImportantUrgent"
                    priorityNumber="3"
                    animationDelay={1}
                  />
                </motion.div>
                <motion.div id="container-two">
                  <Card
                    identifier={'card-two'}
                    blockColor="#4D6A65"
                    path="/todos"
                    priority="Important & not urgent"
                    category="importantNotUrgent"
                    priorityNumber="2"
                    animationDelay={0.7}
                  />
                  <Card
                    identifier={'card-three'}
                    blockColor="#767676"
                    path="/todos"
                    priority="Not important & not urgent"
                    category="notImportantNotUrgent"
                    priorityNumber="4"
                    animationDelay={1.2}
                  />
                </motion.div>
              </LayoutGroup>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Base;
