import React from 'react';

import LottieView from 'lottie-react-native';

function UploadedMessageAnimation(props) {
  return (
    <LottieView
      autoPlay
      loop
      speed={0.9}
      style={{
        width: '100%',
        height: 600,
        marginBottom: -95,
        // backgroundColor: '#eee',
      }}
      source={require('../../assets/animations/UploadesMessage.json')}
    />
  );
}

export default UploadedMessageAnimation;
