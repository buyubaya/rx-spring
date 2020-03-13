import React, {
  useEffect,
  useState,
} from 'react'
import Card from './Card';
import SVGMask from './SVGMask';
import './SwipeCard.css';
// import {
//   WIDTH,
//   HEIGHT,
// } from './constants';


export const WIDTH = 500;
export const HEIGHT = 500;


const SwipeCard = () => {

  const RenderSVGMaskLight = ({ disabled, onChange }) => (
    <SVGMask
      id="svg-mask-light"
      reverse
      active
      style={{
        position:"absolute",
      }}
      onChange={onChange}
      disabled={disabled}
      width={WIDTH}
      height={HEIGHT}
    >
      <Card
        light
        width={WIDTH}
        height={HEIGHT}
      />
    </SVGMask>
  );


  const RenderSVGMaskDark = ({ disabled,onChange }) => (
    <SVGMask
      id="svg-mask-dark"
      reverse={false}
      active
      style={{
        position:"absolute",
      }}
      onChange={onChange}
      disabled={disabled}
      width={WIDTH}
      height={HEIGHT}
    >
      <Card
        width={WIDTH}
        height={HEIGHT}
      />
    </SVGMask>
  );


  const [mode, setMode] = useState(1);
  const isLight = mode > 0;
  const [svgMasks, setSvgMasks] = useState([
    isLight ? <RenderSVGMaskDark /> : <RenderSVGMaskLight />,
  ]);


  function _handleChange() {
    setMode((prevMode) => -prevMode);
    
    setSvgMasks((prevState) => {
      const newState = [...prevState];
      if (newState.length > 1) {
        newState.shift();
      }
      const newItem = isLight ?
        <RenderSVGMaskLight key={Date.now()} /> :
        <RenderSVGMaskDark key={Date.now()} />;
      newState.push(newItem);

      return newState;
    });
  };


  return (
    <div className='cards-wrapper'>
      <Card
        light={isLight}
        width={WIDTH}
        height={HEIGHT}
      />
      {
        svgMasks.map((item) => (
          React.cloneElement(item, {
            onChange: _handleChange,
          })
        ))
      }
    </div>
  );
}


export default SwipeCard
