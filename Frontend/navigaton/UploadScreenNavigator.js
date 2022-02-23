import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UploadMessageScreen from '../Screen/UploadesMessage';
import UploadScreen from '../Screen/UploadScreen';

const Stack = createNativeStackNavigator();

const UploadScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UploadScreen"
      component={UploadScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="UploadMessage"
      component={UploadMessageScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default UploadScreenNavigator;
