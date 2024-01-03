import React from 'react';
import './ColorButtons.css';

const ColorButtons = ({ setBlockColor }) => {
  const clickHandler = (color) => {
    setBlockColor(color);
  };

  return (
    <div id="color-buttons">
      <button
        className="color-button"
        style={{ backgroundColor: '#201B20' }}
        onClick={() => clickHandler('#201B20')}
      ></button>
      <button
        className="color-button"
        style={{ backgroundColor: '#554A3A' }}
        onClick={() => clickHandler('#554A3A')}
      ></button>
      <button
        className="color-button"
        style={{ backgroundColor: '#4E7E85' }}
        onClick={() => clickHandler('#4E7E85')}
      ></button>
      <button
        className="color-button"
        style={{ backgroundColor: '#4D6A65' }}
        onClick={() => clickHandler('#4D6A65')}
      ></button>
    </div>
  );
};

export default ColorButtons;
