import { React } from 'react';
import { Link } from 'react-router-dom';
import { cubicBezier, motion, LayoutGroup, easeIn } from 'framer-motion';
import './Card.css';

const Card = ({
  identifier,
  blockColor,
  path,
  priority,
  category,
  priorityNumber,
  animationDelay,
}) => {
  return (
    <Link
      to={path}
      id={identifier}
      state={{
        color: blockColor,
        priorityText: priority,
        todoCategory: category,
      }}
    >
      <motion.div
        className="card"
        id={identifier}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.35,
          type: cubicBezier(0.25, 1, 0.5, 1),
          delay: animationDelay,
        }}
        whileHover={{scale: 1.025, transition: 0.35, type: cubicBezier(0.25, 1, 0.5, 1)}}
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
      </motion.div>
    </Link>
  );
};

export default Card;
