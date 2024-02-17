import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import '../Base/Base.css';

const PlannedTaskContainer = ({
  priorityLevel,
  priorityColour,
  priorityCategory,
  plannedTasks,
  priorityNumber,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger the animation of children
      },
    },
  };

  // Item variants
  const itemVariants = {
    hidden: { y: 3, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        type: cubicBezier(0.25, 1, 0.5, 1),
      }}
    >
      <p style={{ fontSize: '1.5rem', margin: '0 0 1.2rem 0' }}>
        <span style={{ color: priorityColour, fontWeight: '700' }}>
          {' '}
          {plannedTasks[priorityCategory].length} {priorityLevel}
        </span>{' '}
        tasks you can prioritise
      </p>
      <div
        className="plannedTodoDivider"
        style={{ backgroundColor: priorityColour }}
      >
        <p>{priorityLevel}</p>
        <div
          className="plannedPriorityNumber"
          style={{
            color: priorityColour,
          }}
        >
          {priorityNumber}
        </div>
      </div>
      <motion.div
        className="todo-container"
        style={{ paddingLeft: '2rem' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plannedTasks[priorityCategory].map((todo, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="todo">
              <button
                type="button"
                className="todo-button"
                style={{
                  backgroundColor: priorityColour,
                  width: '16px',
                  height: '16px',
                  borderColor: priorityColour,
                  borderRadius: '100%',
                }}
              ></button>
              <p className="todo-text">{todo.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PlannedTaskContainer;
