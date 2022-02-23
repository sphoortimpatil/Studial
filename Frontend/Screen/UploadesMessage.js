import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,

  Dimensions,
} from 'react-native';
import UploadedMessageAnimation from '../components/animations/UploadedMessageAnimation';
import Screen from '../components/common/Screen';

const {width, height} = Dimensions.get('window');
function UploadMessageScreen() {
  return (
    <Screen>
      <View style={styles.Wrapper}>
        <Text>Uploaded File </Text>
        <View style={styles.animation}>
          <UploadedMessageAnimation />
        </View>
      </View>
    </Screen>
  );
}

export default UploadMessageScreen;

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: '#051739',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // marginTop: StatusBar.currentHeight,
  },
  animation: {
    display: 'flex',
    flex: 1,
    height: height,
    justifyContent: 'flex-end',
    // backgroundColor: "pink",
  },
});
