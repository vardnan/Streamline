import { React } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ identifier, blockColor, path, priority, category }) => {
  return (
    <Link
      className="card"
      id={identifier}
      to={path}
      state={{
        color: blockColor,
        priorityText: priority,
        todoCategory: category,
      }}
    >
      <div>
        <p
          style={{
            color: priority === 'Important & urgent' ? 'white' : blockColor,
          }}
        >
          {priority}
        </p>
      </div>
      <div
        className="color-block"
        style={{ backgroundColor: blockColor }}
      ></div>
    </Link>
  );
};

export default Card;
