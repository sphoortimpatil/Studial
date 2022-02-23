import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppText({
  iconName,
  iconColor,
  children,
  height = 60,
  borderRadius = 25,
  backgroundColor = '#E5E5E5',
  marginVertical = 5,
}) {
  return (
    <View
      style={[
        styles.container,
        {height},
        {borderRadius},
        {backgroundColor},
        {marginVertical},
      ]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={36}
          color={iconColor || 'grey'}
          style={styles.icon}
        />
      )}

      <Text style={styles.textInput}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // width: '100%',
    // marginVertical: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 5,
    justifyContent: 'center',
    width: '9%',
    marginRight: 10,
  },
  textInput: {
    height: '100%',
    width: '100%',
    color: '#111',
    fontSize: 18,
    paddingLeft: 7.5,
    textAlignVertical: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppText;
