import { React, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import '../Pages/Page.css';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const Todos = ({
  todos,
  checkTodo,
  checkedColor,
  editingText,
  setEditingText,
  editingId,
  handleEdit,
  handleSave,

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

  const handleFocus = (event) => {
    // Set the cursor position to the start of the text (position 0)
    event.target.setSelectionRange(0, 0);
  };

  return (
    <motion.div
      id="todos-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%'}}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => {
              return (
                <Draggable
                  key={todo.id.toString()}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        position: 'static', // or other required styles
                      }}
                    >
                      <motion.div
                        className="todo"
                        variants={itemVariants} // Use variants for each item
                        whileHover={{ scale: 1.00 }}
                        whileTap={{ opacity: 0.7 }}
                      >
                        {todo.type === 'header' ? (
                          <p
                            className="todo-header-text"
                            style={{ color: checkedColor }}
                          >
                            {todo.text}
                          </p>
                        ) : editingId === todo.id ? (
                          <>
                            <button
                              className="todo-button"
                              style={{
                                backgroundColor: todo.isChecked
                                  ? checkedColor
                                  : '#FFF',
                                borderColor: checkedColor,
                              }}
                              onClick={() => checkTodo(todo.id)}
                            ></button>
                            <input 
                            id='todo-text-editing'
                            className='todo-text'
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onBlur={() => handleSave(todo.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSave(todo.id);
                                }
                              }}
                              onFocus={handleFocus}
                              autoFocus
                            />
                            </>
                        ) : (
                          <>
                            <button
                              className="todo-button"
                              style={{
                                backgroundColor: todo.isChecked
                                  ? checkedColor
                                  : '#FFF',
                                borderColor: checkedColor,
                              }}
                              onClick={() => checkTodo(todo.id)}
                            ></button>
                            <p
                              className="todo-text"
                              style={{
                                textDecoration: todo.isChecked
                                  ? 'line-through'
                                  : 'none',
                                color: todo.isChecked
                                  ? checkedColor
                                  : '#201B20',
                                opacity: todo.isChecked ? 0.8 : 1,
                              }}
                              onClick={() => checkTodo(todo.id)}
                              onDoubleClick={() => handleEdit(todo)}
                            >
                              {todo.text}
                            </p>
                          </>
                        )}
                      </motion.div>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </motion.div>
  );
};

export default Todos;
