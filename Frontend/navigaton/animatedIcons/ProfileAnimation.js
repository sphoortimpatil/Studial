import React, {useEffect, useRef} from 'react';

import LottieView from 'lottie-react-native';

function ProfileAnimation() {
  const animation = useRef();
  useEffect(() => {
    // console.log('focused');

    animation.current?.play(0, 42);
  });

  return (
    <LottieView
      ref={animation}
      autoPlay={false}
      loop={false}
      style={{
        // width: '100%',
        height: 80,
        marginBottom: '-10%',
        marginTop: '0%',

        // backgroundColor: 'pink',
      }}
      source={require('../../assets/animations/TabBar/ProfileIcon.json')}
    />
  );
}

export default ProfileAnimation;
