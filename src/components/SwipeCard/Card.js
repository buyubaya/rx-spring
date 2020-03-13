import React, {
  useState,
  useEffect,
} from 'react';


const Card = ({
  light,
  width: WIDTH,
  height: HEIGHT,
}) => {

  const [isLight, setIsLight] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsLight(light);
    }, 150);
  }, [light]);


  return (
    <div
      className='card'
      style={{
        background: '#fff',
        pointerEvents: 'none',
        userSelect: 'none',
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    >
      <img
        style={{
          width: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
          filter: isLight ? "none" : "invert(100%)",
        }}
        src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/50/29/83/502983f9-0737-4940-e16f-954a701ca1d9/source/512x512bb.jpg"
      />
    </div>
  )
}


export default Card
