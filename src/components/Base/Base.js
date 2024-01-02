import { React, useState } from 'react';
import './Base.css';
import Card from '../Card/Card';
import ColorButtons from '../ColorButtons/ColorButtons';

const Base = () => {
  const [blockColor, setBlockColor] = useState('#4D6A65');
  return (
    <div id="parent">
      <div id="base" className="container">
        <div id="container-one">
          <Card
            identifier={'card-one'}
            blockColor={blockColor}
            path="/todos"
            priority="Important & urgent"
          />
          <Card
            identifier={'card-four'}
            blockColor={blockColor}
            path="/todos"
            priority="Important & not urgent"
          />
        </div>
        <div id="container-two">
          <Card
            identifier={'card-two'}
            blockColor={blockColor}
            path="/todos"
            priority="Not important & urgent"
          />
          <Card
            identifier={'card-three'}
            blockColor={blockColor}
            path="/todos"
            priority="Not important & not urgent"
          />
        </div>
      </div>
      <ColorButtons setBlockColor={setBlockColor} />
    </div>
  );
};

export default Base;
