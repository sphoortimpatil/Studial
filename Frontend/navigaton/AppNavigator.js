import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import UploadScreen from '../Screen/UploadScreen';
import profileScreenNavigator from './profileScreenNavigator';
import UploadScreenNavigator from './UploadScreenNavigator';
import AddNewAnimated from './animatedIcons/AddNewAnimated';
import AddNewIcon from './Icons/AddNewIcon';
import routes from './routes';
import UploadedScreen from '../Screen/UploadedFilesScreen';
import UploadedFilesScreen from '../Screen/UploadedFilesScreen';
import BookMarksScreen from '../Screen/BookmarkScreen';
import HomeAnimation from './animatedIcons/HomeAnimation';
import BookmarkAnimation from './animatedIcons/BookmarkAnimation';
import UploadedFilesAnimation from './animatedIcons/UploadedFilesAnimation';
import ProfileAnimation from './animatedIcons/ProfileAnimation';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <>
            {!focused && (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            {focused && <HomeAnimation focused={focused} />}
          </>
        ),
      }}
    />
    <Tab.Screen
      name="Bookmarks"
      component={BookMarksScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <>
            {!focused && (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            {focused && <BookmarkAnimation focused={focused} />}
          </>
        ),
      }}
    />
    <Tab.Screen
      name="New"
      component={UploadScreen}
      options={({navigation}) => ({
        headerShown: false,

        tabBarButton: ({accessibilityState}) => (
          <AddNewIcon
            onPress={() => navigation.navigate(routes.NEW)}
            accessibilityState={accessibilityState}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Uploaded"
      component={UploadedFilesScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <>
            {!focused && (
              <MaterialCommunityIcons
                name="folder-open-outline"
                color={color}
                size={size}
              />
            )}
            {focused && <UploadedFilesAnimation focused={focused} />}
          </>
        ),
      }}
    />
    <Tab.Screen
      name="Profile-Screen"
      component={profileScreenNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <>
            {!focused && (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            {focused && <ProfileAnimation focused={focused} />}
          </>
        ),
      }}
    />
  </Tab.Navigator>
);
export default AppNavigator;
