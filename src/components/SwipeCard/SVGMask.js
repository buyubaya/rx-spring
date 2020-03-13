import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import { useSpring, useTransition, animated, interpolate, useChain } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import * as d3 from "d3-shape";
import { getData, getReverseData, getSVGPath } from './helpers';


const SVGMask = ({
  active,
  children,
  style,
  reverse,
  onChange,
  id,
  width: WIDTH,
  height: HEIGHT,
}) => {

  const INITIAL_X = WIDTH * 0.15;
  const INITIAL_Y = HEIGHT * 0.5;

  const [disabled, setDisabled] = useState(false);

  const [{ x, y }, setXY, stop] = useSpring(() => ({
    x: -100,
    y: 0,
  }));

  const bind = useDrag(
    ({ down, delta, previous, velocity, distance, movement, direction }) => {

      const m = reverse ? -1 : 1;

      let newX = down ? movement[0] * m : 0;
      let newY =  down ? movement[1] : 0;
      if (disabled) {
        setXY({ x: WIDTH * 3, y: newY });
        stop();
        return;
      }

      if (newX > WIDTH * 0.9 || velocity > 5) {
        onChange && onChange();
        setDisabled(true);
        return;
      }

      setXY({ x: newX, y: newY });
    }
  );

  useEffect(() => {
    setXY({
      x: active ? 0 : -1 * WIDTH,
      y: 0,
    });
  }, [active]);


  const d = interpolate([x, y], (x, y) => {
    return getSVGPath({
      d3: d3,
      data: (
        reverse ?
          getReverseData({
            midX: INITIAL_X + x,
            midY: INITIAL_Y + y,
            WIDTH: WIDTH,
            HEIGHT: HEIGHT,
          }) :
          getData({
            midX: INITIAL_X + x,
            midY: INITIAL_Y + y,
            WIDTH: WIDTH,
            HEIGHT: HEIGHT,
          })
      ),
    });
  });


  return (
    <div
      style={{
        ...style,
        width: WIDTH,
        height: HEIGHT,
        clipPath: active ? `url(#${id})` : "initial",
      }}
      {...bind()}
    >
      {
        children
      }

      <svg
        style={{
          width: 0,
          height: 0,
        }}
      >
        <clipPath id={id}>
          <animated.path d={d} />
        </clipPath>
      </svg>

    </div>
  )
};


export default SVGMask;
