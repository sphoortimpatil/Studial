import React, {useEffect, useRef} from 'react';

import LottieView from 'lottie-react-native';

function BookmarkAnimation({focused}) {
  const animation = useRef();
  useEffect(() => {
    // console.log('focused', {focused});

    animation.current?.play(0, 25);
  });

  return (
    <LottieView
      ref={animation}
      autoPlay={false}
      loop={false}
      style={{
        // width: '100%',
        height: 85,
        marginBottom: '-1%',
        marginTop: '0%',

        // backgroundColor: 'pink',
      }}
      source={require('../../assets/animations/TabBar/BookmarkIcon.json')}
    />
  );
}

export default BookmarkAnimation;
