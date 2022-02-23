import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '../Screen/ProfileScreen';
import UploadScreen from '../Screen/UploadScreen';
import BookMarkScreen from './../Screen/BookmarkScreen';
import AboutScreen from '../Screen/AboutScreen';
const Stack = createNativeStackNavigator();

const profileScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Bookmarks"
      component={BookMarkScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Upload"
      component={UploadScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default profileScreenNavigator;
