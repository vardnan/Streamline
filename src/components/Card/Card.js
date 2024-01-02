import { React } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ identifier, blockColor, path, priority }) => {
  return (
    <Link
      className="card"
      id={identifier}
      to={path}
      state={{ color: blockColor, priorityText: priority }}
    >
      <div
        className="color-block"
        style={{ backgroundColor: blockColor }}
      ></div>
    </Link>
  );
};

export default Card;
