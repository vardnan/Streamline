import React from 'react';
import { easeInOut, motion } from 'framer-motion';
import '../Pages/Page.css';

const Todos = ({ todos }) => {
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Stagger the animation of children
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
      id="todos-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {todos.map((todo) => (
        <motion.div
          key={todo.id}
          className="todo"
          variants={itemVariants} // Use variants for each item
        >
          <button className="todo-button"></button>
          <p className="todo-text">{todo.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Todos;
