import { React } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({
  identifier,
  blockColor,
  path,
  priority,
  category,
  priorityNumber,
}) => {
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
        <div
          className="priorityNumber"
          style={{
            backgroundColor:
              priority === 'Important & urgent' ? 'white' : blockColor,
            color: priority === 'Important & urgent' ? blockColor : 'white',
          }}
        >
          {priorityNumber}
        </div>
      </div>
      <div
        className="color-block"
        style={{ backgroundColor: blockColor }}
      ></div>
    </Link>
  );
};

export default Card;
