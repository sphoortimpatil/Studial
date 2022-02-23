import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from './AppText';

function PickerItem({item, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.pickerWrapper}>
        <View style={styles.picker}>
          <AppText
            height={47}
            borderRadius={7}
            backgroundColor="#DAF0FD"
            marginVertical={0}>
            {item.label}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PickerItem;

const styles = StyleSheet.create({
  pickerWrapper: {
    width: '100%',
    // backgroundColor: "pink",
    alignItems: 'center',
  },
  picker: {
    width: '90%',
    // backgroundColor: "blue",
    borderBottomWidth: 1.4,
    borderRadius: 10,
    borderColor: '#2F2F2F',
    marginVertical: 5,
  },
});
