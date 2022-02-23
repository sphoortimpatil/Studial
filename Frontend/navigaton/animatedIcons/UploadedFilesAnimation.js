import React, {useEffect, useRef} from 'react';

import LottieView from 'lottie-react-native';

function UploadedFilesAnimation() {
  const animation = useRef();
  useEffect(() => {
    // console.log('focused');

    animation.current?.play(10, 35);
  });

  return (
    <LottieView
      ref={animation}
      autoPlay={false}
      loop={false}
      style={{
        // width: '100%',
        height: 60,
        marginBottom: '19%',
        // marginTop: '0%',

        // backgroundColor: 'pink',
      }}
      source={require('../../assets/animations/TabBar/UpoloadedFilesIcon.json')}
    />
  );
}

export default UploadedFilesAnimation;
