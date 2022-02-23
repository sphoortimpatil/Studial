import React from 'react';
import {
  StyleSheet,
  View,
  Text,

} from 'react-native';

import Screen from '../components/common/Screen';

function SplashScreen() {
  return (
    <Screen>
      <View style={styles.homeWrapper}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 27,
            fontFamily: 'Poppins-SemiBold',
          }}>
          "Loading"
        </Text>
        {/* <ActivityIndicator size="large" color="#FFFFFF" /> */}
      </View>
    </Screen>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  homeContainer: {
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
  },
  homeTop: {
    backgroundColor: '#E5E5E5',
    height: 200,
    display: 'flex',
    //flex:0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop:20,
    // paddingBottom:20,
  },
  homeBottom: {
    backgroundColor: '#051739',
    // height: "80%",
    flex: 2,
    // marginTop:"40%",
    // borderRadius:"2%",
    // borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 32,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // overflow: "scroll",
  },
  list: {
    flex: 1,
    margin: 5,
    // flexDirection:"row",
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
