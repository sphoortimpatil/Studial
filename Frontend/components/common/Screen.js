import React from 'react';
import {StyleSheet, SafeAreaView, View, StatusBar} from 'react-native';

function Screen({children, style}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: StatusBar.currentHeight,
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
  },
  view: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default Screen;
