import React from 'react';
import '../Base/Base.css';

const PlannedTaskContainer = ({
  priorityLevel,
  priorityColour,
  priorityCategory,
  plannedTasks,
  priorityNumber,
}) => {
  return (
    <div>
      <p style={{fontSize: '1.5rem', margin: '0 0 1.2rem 0'}}>
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
          className="priorityNumber"
          style={{
            position: 'relative',
            color: priorityColour,
            backgroundColor: 'white',
          }}
        >
          {priorityNumber}
        </div>
      </div>
      <div className="todo-container" style={{ paddingLeft: '2rem' }}>
        {plannedTasks[priorityCategory].map((todo, index) => (
          <div key={index}>
            <div className="todo">
              <button
                type="button"
                className="todo-button"
                style={{
                  backgroundColor: 'white',
                  borderColor: priorityColour,
                }}
              ></button>
              <p className="todo-text">{todo.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannedTaskContainer;
