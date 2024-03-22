import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Card.css';

type Props = {
  identifier: string;
  blockColor: string;
  path: string;
  priority: string;
  category: string;
  priorityNumber: string;
  animationDelay: number;
};

const Card: FC<Props> = ({
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
          ease: [0.25, 1, 0.5, 1],
          delay: animationDelay,
        }}
        whileHover={{
          scale: 1.035,
          transition: { duration: 0.1, ease: [0.25, 1, 0.5, 1] },
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
      </motion.div>
    </Link>
  );
};

export default Card;
