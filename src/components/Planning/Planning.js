import React, { useState, useEffect } from 'react';

const Planning = () => {
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
    let plannedTasks = pickRandomTasks(importantUrgentTodos, 3);

    if (plannedTasks.length < 3) {
      // Not enough important & urgent tasks, fill with important & not urgent if available
      plannedTasks = [
        ...plannedTasks,
        ...pickRandomTasks(importantNotUrgentTodos, 3 - plannedTasks.length),
      ];
    } else {
      // If there are 3 or more important & urgent, fill the rest with important & not urgent if available
      plannedTasks = [
        ...plannedTasks,
        ...pickRandomTasks(importantNotUrgentTodos, 2),
      ];
    }

    // Ensure we don't have more than 5 tasks
    plannedTasks = plannedTasks.slice(0, 5);

    return plannedTasks.length ? plannedTasks : null;
  };

  const handleHelpMePlan = () => {
    const plannedTasks = getPlannedTasks();
    if (!plannedTasks) {
      // Render "Add more important tasks to get help planning"
    } else {
      // Render the tasks in the UI, categorizing them visually
    }
  };

  // Call handleHelpMePlan when the "help me plan" button is clicked
  // Attach this function to the onClick event of the button.

  return <div></div>;
};

export default Planning;
