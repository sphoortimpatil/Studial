import React from 'react';

import LottieView from 'lottie-react-native';

function UploadPaperPlaneAnimation(props) {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: '100%',
        height: 220,
        marginLeft: '-6%',
        marginTop: '-14.5%',

        // backgroundColor: 'pink',
      }}
      autoSize
      resizeMode="cover"
      preserveAspecrRatio="xMidYMid slice"
      source={require('../../assets/animations/Uploade-paperPlane.json')}
    />
  );
}

export default UploadPaperPlaneAnimation;
