import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppTextInput({
  iconName,
  borderRadius = 25,
  height = 60,
  ...otherProps
}) {
  return (
    <View style={[styles.container, {borderRadius}, {height}]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={36}
          color="grey"
          style={styles.icon}
        />
      )}

      <TextInput
        // autoCorrect={autoCorrect}
        // placeholder={placeHolder}
        style={styles.textInput}
        placeholderTextColor="grey"
        // autoCapitalize={autoCapitalize}
        // secureTextEntry={secureTextEntry}
        {...otherProps}
        // onChangeText={onChangeText}
        // onBlur={onBlur}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    borderRadius: 25,
    display: 'flex',
    width: '100%',
    height: 60,
    marginVertical: 5,
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
    height: 60,
    width: '91%',
    paddingStart: 10,
    justifyContent: 'center',

    color: '#111',
    fontSize: 18,
    paddingLeft: 1,
    // marginLeft: 8,
    // backgroundColor: 'pink',
  },
});

export default AppTextInput;
