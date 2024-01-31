import { React, useState } from 'react';
import { cubicBezier, motion } from 'framer-motion';
import './Base.css';
import Card from '../Card/Card';
import ColorButtons from '../ColorButtons/ColorButtons';

const Base = () => {
  const [blockColor, setBlockColor] = useState('#4D6A65');

  return (
    <motion.div
      id="parent"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: cubicBezier(0.25, 1, 0.5, 1)}}
    >
      <div id="base" className="container">
        <div id="container-one">
          <Card
            identifier={'card-one'}
            blockColor={blockColor}
            path="/todos"
            priority="Important & urgent"
            category="importantUrgent"
          />
          <Card
            identifier={'card-four'}
            blockColor={blockColor}
            path="/todos"
            priority="Not important & urgent"
            category="notImportantUrgent"
          />
        </div>
        <div id="container-two">
          <Card
            identifier={'card-two'}
            blockColor={blockColor}
            path="/todos"
            priority="Important & not urgent"
            category="importantNotUrgent"
          />
          <Card
            identifier={'card-three'}
            blockColor={blockColor}
            path="/todos"
            priority="Not important & not urgent"
            category="notImportantNotUrgent"
          />
        </div>
      </div>
      {/* <ColorButtons setBlockColor={setBlockColor} /> */}
    </motion.div>
  );
};

export default Base;
