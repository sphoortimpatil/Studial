import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import Screen from '../components/common/Screen';

import ContactUsAnimation from '../components/animations/ContactUsAnimation';

function AboutScreen() {
  return (
    <Screen>
      <View style={styles.ProfileWrapper}>
        <View style={styles.logo}>
          <Image
            style={[{resizeMode: 'contain'}, {width: 120}, {height: 80}]}
            source={require('../assets/logo/studialLogo.png')}
          />
        </View>
        <ContactUsAnimation />
        <View>
          <Text style={styles.titleFont}>About</Text>
          <Text style={styles.bodyFont}>Team- "ss-tech"</Text>
        </View>
        <View style={styles.BottomContainer}>
          <View>
            <Image
              style={[styles.icon, {width: 180}, {height: 265}]}
              source={require('../assets/Images/Sumit.jpg')}
            />
            <Text style={styles.bodyFont}>Sumit Athani</Text>
          </View>

          <View>
            <Image
              style={[styles.icon, {width: 180}, {height: 265}]}
              source={require('../assets/Images/Sphoorti.jpg')}
            />
            <Text style={styles.bodyFont}>Sphoorti Patil</Text>
          </View>
        </View>
        <View>
          <Text style={styles.titleFont}>Contact Us</Text>
          <Text style={styles.bodyFont}>sstech.apps.mobile@gmail.com</Text>
        </View>
      </View>
    </Screen>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  ProfileWrapper: {
    backgroundColor: '#051739',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    height: '100%',
    // marginTop: StatusBar.currentHeight,
  },
  logo: {
    color: 'white',
    fontSize: 20,
    display: 'flex',
    // height: "30%",
    paddingLeft: 15,
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginTop: 10,

    marginBottom: 0,
    // backgroundColor: 'blue',
  },

  titleFont: {
    fontSize: 28,
    color: '#a83248',
    textAlign: 'center',
  },
  bodyFont: {
    fontSize: 20,
    color: '#DAF0FD',
    textAlign: 'center',
  },
  BottomContainer: {
    // height: '100%',
    width: '100%',
    // backgroundColor: '#E5E5E5',
    padding: 4,
    // borderRadius: 22,
    marginBottom: 10,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    borderRadius: 20,
  },
  // textWrapper: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  // },
});
