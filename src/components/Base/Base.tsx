import React, { useState, FC } from 'react';
import {
  motion,
  LayoutGroup,
  useAnimationControls,
  easeOut,
} from 'framer-motion';
import './Base.css';
import Card from '../Card/Card.tsx';
import PlannedTaskContainer from '../PlannedTaskContainer/PlannedTaskContainer.tsx';
import '../PlannedTaskContainer/PlannedTaskContainer.css';

const Base: FC = () => {
  const [plannedTasks, setPlannedTasks] = useState<
    string | { importantUrgentTasks: {}[]; importantNotUrgentTasks: {}[] }
  >('Add more important tasks to get help planning');
  const [planTasks, setPlanTasks] = useState<boolean>(false);
  const controls = useAnimationControls();
  const eqControls = useAnimationControls();

  const initialVariant: {
    x: number;
    transition: { duration: number; ease: string };
  } = {
    x: 0,
    transition: {
      duration: 0.76,
      ease: 'easeOut',
    },
  };

  const eqInitialVariant: {
    scaleY: number;
    transition: { duration: number; ease: string };
  } = {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  };

  const variants1: {
    animate: {
      scaleY: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: "reverse" | "mirror" | "loop";
      };
    };
  } = {
    animate: {
      scaleY: [1, 1.4, 0.8, 1], // These values can be adjusted
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  };

  const variants2: {
    animate: {
      scaleY: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: "reverse" | "mirror" | "loop";
        delay: number;
      };
    };
  } = {
    animate: {
      scaleY: [1, 1.4, 0.8, 1], // These values can be adjusted
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'mirror',
        delay: 0.3,
      },
    },
  };

  const variants3: {
    animate: {
      scaleY: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: "reverse" | "mirror" | "loop";
        delay: number;
      };
    };
  } = {
    animate: {
      scaleY: [1, 1.2, 0.8, 1], // These values can be adjusted
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'mirror',
        delay: 0.6,
      },
    },
  };

  const variants4: {
    animate: {
      scaleY: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: "reverse" | "mirror" | "loop";
        delay: number;
      };
    };
  } = {
    animate: {
      scaleY: [1, 1.4, 0.8, 1], // These values can be adjusted
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'mirror',
        delay: 0.9,
      },
    },
  };

  const variants5: {
    animate: {
      scaleY: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: "reverse" | "mirror" | "loop";
        delay: number;
      };
    };
  } = {
    animate: {
      scaleY: [1, 1.4, 0.8, 1], // These values can be adjusted
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'mirror',
        delay: 1.2,
      },
    },
  };

  const getAllTodos = () => {
    const todos: {
      importantUrgent: { type: string }[];
      importantNotUrgent: { type: string }[];
    } = JSON.parse(localStorage.getItem('todos') || "{}");
    const importantUrgentTodos: {}[] =
      todos.importantUrgent?.filter((todo) => todo.type !== 'header') || [];
    const importantNotUrgentTodos: {}[] =
      todos.importantNotUrgent?.filter((todo) => todo.type !== 'header') || [];
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
    const plannedTasks: {
      importantUrgentTasks: {}[];
      importantNotUrgentTasks: {}[];
    } = {
      importantUrgentTasks: [],
      importantNotUrgentTasks: [],
    };

    // Fill the importantUrgentTasks array with up to 3 tasks if there are enough tasks available
    plannedTasks.importantUrgentTasks = pickRandomTasks(
      importantUrgentTodos,
      Math.min(3, importantUrgentTodos.length)
    );

    // Calculate how many tasks are still needed to reach 5
    let slotsNeeded: number = 5 - plannedTasks.importantUrgentTasks.length;

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
      const additionalUrgentTasks: {}[] = pickRandomTasks(
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
    const tasks:
      | { importantUrgentTasks: {}[]; importantNotUrgentTasks: {}[] }
      | string = getPlannedTasks();
    setPlannedTasks(tasks);
    setPlanTasks(true);
  };

  const renderPlannedTasks = () => {
    if (typeof plannedTasks === 'string') {
      return (
        <div id="noPlannedTasks">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
          >
            <path
              d="M18.9841 3.16675C10.2441 3.16675 3.16663 10.2601 3.16663 19.0001C3.16663 27.7401 10.2441 34.8334 18.9841 34.8334C27.74 34.8334 34.8333 27.7401 34.8333 19.0001C34.8333 10.2601 27.74 3.16675 18.9841 3.16675ZM19 31.6667C12.0016 31.6667 6.33329 25.9984 6.33329 19.0001C6.33329 12.0017 12.0016 6.33341 19 6.33341C25.9983 6.33341 31.6666 12.0017 31.6666 19.0001C31.6666 25.9984 25.9983 31.6667 19 31.6667ZM17.4166 23.7501H20.5833V26.9167H17.4166V23.7501ZM17.4166 11.0834H20.5833V20.5834H17.4166V11.0834Z"
              fill="#333333"
            />
          </svg>
          <p id="noPlannedTasksText">
            add more <span style={{ fontWeight: 600 }}>important tasks</span> to
            get help planning
          </p>
        </div>
      );
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
              animationDelay={0.2}
            />
          )}
          {plannedTasks.importantNotUrgentTasks.length >= 1 && (
            <PlannedTaskContainer
              priorityLevel="important & not urgent"
              priorityColour="#4D6A65"
              priorityCategory="importantNotUrgentTasks"
              plannedTasks={plannedTasks}
              priorityNumber={2}
              animationDelay={0.4}
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
          type: 'spring',
          duration: 0.2,
          bounce: 0,
          delay: 0.2,
        }}
      ></motion.div>
      <motion.div
        className="background-logo"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          duration: 1.05,
          bounce: 0,
          delay: 0.3,
        }}
      >
        dieter
      </motion.div>
      <motion.div
        id="holder"
        layout
        transition={{
          type: 'spring',
          duration: 0.5,
          bounce: 0.1,
        }}
      >
        <motion.div
          className="action-button"
          onClick={planTasks ? () => setPlanTasks(false) : handleHelpMePlan}
          onHoverStart={() =>
            planTasks
              ? controls.start({
                  x: [0, 1.5, 0],
                  transition: {
                    repeat: Infinity,
                    type: easeOut,
                    duration: 0.75,
                  },
                })
              : eqControls.start('animate')
          }
          onHoverEnd={() =>
            planTasks
              ? controls.start(initialVariant)
              : eqControls.start(eqInitialVariant)
          }
        >
          {planTasks ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <motion.g clipPath="url(#clip0_769_330)" animate={controls}>
                <path
                  d="M19.5 11H8.32998L13.21 6.11997C13.6 5.72997 13.6 5.08997 13.21 4.69997C12.82 4.30997 12.19 4.30997 11.8 4.69997L5.20998 11.29C4.81998 11.68 4.81998 12.31 5.20998 12.7L11.8 19.29C12.19 19.68 12.82 19.68 13.21 19.29C13.6 18.9 13.6 18.27 13.21 17.88L8.32998 13H19.5C20.05 13 20.5 12.55 20.5 12C20.5 11.45 20.05 11 19.5 11Z"
                  fill="#333333"
                />
              </motion.g>
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
            </motion.svg>
          ) : (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_872_83)">
                <motion.path
                  d="M8 18C8.55 18 9 17.55 9 17V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18ZM8 18C8.55 18 9 17.55 9 17V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18ZM8 18C8.55 18 9 17.55 9 17V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18ZM8 18C8.55 18 9 17.55 9 17V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18ZM8 18C8.55 18 9 17.55 9 17V7C9 6.45 8.55 6 8 6C7.45 6 7 6.45 7 7V17C7 17.55 7.45 18 8 18Z"
                  fill="#333333"
                  animate={eqControls}
                  variants={variants2}
                />
                <motion.path
                  d="M13 21C13 21.55 12.55 22 12 22C11.45 22 11 21.55 11 21V3C11 2.45 11.45 2 12 2C12.55 2 13 2.45 13 3V21Z"
                  fill="#333333"
                  animate={eqControls}
                  variants={variants3}
                />
                <motion.path
                  d="M5 13C5 13.55 4.55 14 4 14C3.45 14 3 13.55 3 13V11C3 10.45 3.45 10 4 10C4.55 10 5 10.45 5 11V13Z"
                  fill="#333333"
                  animate={eqControls}
                  variants={variants1}
                />
                <motion.path
                  d="M17 17C17 17.55 16.55 18 16 18C15.45 18 15 17.55 15 17V7C15 6.45 15.45 6 16 6C16.55 6 17 6.45 17 7V17Z"
                  fill="#333333"
                  animate={eqControls}
                  variants={variants4}
                />
                <motion.path
                  d="M19 13V11C19 10.45 19.45 10 20 10C20.55 10 21 10.45 21 11V13C21 13.55 20.55 14 20 14C19.45 14 19 13.55 19 13Z"
                  fill="#333333"
                  animate={eqControls}
                  variants={variants5}
                />
              </g>
              <defs>
                <clipPath id="clip0_872_83">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </motion.svg>
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
              <LayoutGroup /*layoutId="cards"*/>
                <motion.div id="container-one">
                  <Card
                    identifier={'card-one'}
                    blockColor="#791616"
                    path="/todos"
                    priority="Important & urgent"
                    category="importantUrgent"
                    priorityNumber="1"
                    animationDelay={0.2}
                  />
                  <Card
                    identifier={'card-four'}
                    blockColor="#486B7F"
                    path="/todos"
                    priority="Not important & urgent"
                    category="notImportantUrgent"
                    priorityNumber="3"
                    animationDelay={0.6}
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
                    animationDelay={0.4}
                  />
                  <Card
                    identifier={'card-three'}
                    blockColor="#767676"
                    path="/todos"
                    priority="Not important & not urgent"
                    category="notImportantNotUrgent"
                    priorityNumber="4"
                    animationDelay={0.8}
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
