import React from 'react';

import LottieView from 'lottie-react-native';

function ContactUsAnimation(props) {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: '100%',
        height: 230,
        marginTop: -5,
        marginBottom: -18,

        // backgroundColor: "#eee",
      }}
      source={require('../../assets/animations/contactUs.json')}
    />
  );
}

export default ContactUsAnimation;
