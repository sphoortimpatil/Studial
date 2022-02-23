import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BottomModal({
  title,
  option1,
  option2,
  icon1,
  icon2,
  onSelect1,
  onSelect2,
  onOpen,
  justifyContent = 'flex-end',
  width = '100%',
  borderRadius = 0,
  height = 230,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.modalWrapper, {justifyContent}]}>
          <View
            animationType="slide"
            style={[styles.modelContainer, {width}, {borderRadius}, {height}]}>
            <View style={styles.infoTitle}>
              <Text style={styles.textTitleStyle}>{title}</Text>
              <MaterialCommunityIcons
                name="close-thick"
                size={32}
                color="crimson"
                onPress={onOpen}
              />
            </View>

            <TouchableOpacity onPress={onSelect1}>
              <View style={styles.selectContainer}>
                {icon1 && (
                  <MaterialCommunityIcons
                    name={icon1}
                    size={36}
                    color="grey"
                    style={styles.icon}
                  />
                )}
                <Text style={styles.textStyle}>{option1}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSelect2}>
              <View style={styles.selectContainer}>
                {icon2 && (
                  <MaterialCommunityIcons
                    name={icon2}
                    size={36}
                    color="grey"
                    style={styles.icon}
                  />
                )}
                <Text style={styles.textStyle}>{option2}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default BottomModal;

styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',

    justifyContent: 'flex-end',
  },

  modalWrapper: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  modelContainer: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'flex-start',

    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
  },
  infoTitle: {
    height: 80,
    width: '100%',

    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },

  textTitleStyle: {
    fontSize: 28,
    color: 'grey',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectContainer: {
    height: 60,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
    justifyContent: 'center',
    width: '9%',
    marginRight: 10,
  },
  textStyle: {
    fontSize: 24,
    color: 'grey',
  },
});
