import React, {useEffect, useState, useRef} from 'react';

import LottieView from 'lottie-react-native';

function AddNewAnimated({accessibilityState}) {
  const animation = useRef(null);
  const [isanimated, setIsAnimated] = useState(true);
  useEffect(() => {
    // console.log('focused');
    if (accessibilityState ) {
      animation.current?.play(0, 51);
      setIsAnimated(false);
    }

    // Or set a specific startFrame and endFrame with:

    // animation.current?.pause(70,120)
  });

  return (
    <LottieView
      ref={animation}
      autoPlay={false}
      loop={false}
      style={{
        // width: '100%',
        height: 95,
        // margin: '-1%',
        marginRight: -1.75,
        marginBottom: 0,

        //backgroundColor: 'pink',
      }}
      source={require('../../assets/animations/TabBar/AddNewIcon.json')}
    />
  );
}

export default AddNewAnimated;
