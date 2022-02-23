import React, {useEffect, useRef} from 'react';

import LottieView from 'lottie-react-native';

function HomeAnimation() {
  const animation = useRef();
  useEffect(() => {
    // console.log('focused');

    animation.current?.play(0, 22);
  });

  return (
    <LottieView
      ref={animation}
      autoPlay={false}
      loop={false}
      style={{
        // width: '100%',
        height: 40,
        margin: '-1%',
        // marginTop: '-14.5%',

        // backgroundColor: 'pink',
      }}
      source={require('../../assets/animations/TabBar/homeIcon.json')}
    />
  );
}

export default HomeAnimation;
