import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
// import Modal from "react-native-modal";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerItem from './PickerItem';

function DropDownPicker({
  iconName,
  items,
  placeholder,
  onSelectItem,
  selectedItem,
  borderRadius = 15,
  height = 45,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={[styles.container, {borderRadius}, {height}]}>
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={36}
              color="grey"
              style={[styles.icon, {marginLeft: 5}]}
            />
          )}
          {/* 
          <Text style={[styles.textInput]}>
            {selectedItem ? selectedItem.label : placeholder}
          </Text> */}
          {selectedItem ? (
            <Text style={styles.textInput}>{selectedItem.label}</Text>
          ) : (
            <Text style={[styles.placeholderInput]}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={27}
            color="black"
            style={([styles.icon], {alignItems: 'flex-end'}, {paddingRight: 5})}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 1}}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          style={styles.modalContent}
          onBackdropPress={() => setModalVisible(!modalVisible)}
          transparent>
          <SafeAreaView
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              // backgroundColor: "red",
              justifyContent: 'center',
            }}>
            <View
              animationType="slide"
              style={{
                height: '34%',
                width: '97%',
                // alignItems: "center",
                borderRadius: 15,
                backgroundColor: '#DAF0FD',
                justifyContent: 'flex-end',
                padding: 25,
              }}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.closeWrapper}>
                  <Text style={{fontSize: 24}}>Close</Text>
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={32}
                    color="#FF7070"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>

              <FlatList
                data={items}
                keyExtractor={item => item.value.toString()}
                renderItem={({item}) => (
                  <PickerItem
                    item={item}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      onSelectItem(item);
                    }}
                  />
                )}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',

    display: 'flex',
    width: '100%',

    marginVertical: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    // marginRight: 5,
    // paddingRight: 5,
    justifyContent: 'center',
    width: '20%',
    backgroundColor: 'pink',
    //alignItems: 'center',
  },
  textInput: {
    height: 60,
    // width: "82%",
    // justifyContent: "center",
    // alignItems: "center",
    color: '#111',
    fontSize: 18,
    width: '80%',
    paddingLeft: 7.5,
    textAlignVertical: 'center',
    // flex: 1,
  },

  placeholderInput: {
    height: 60,
    color: 'grey',
    fontSize: 18,
    width: '80%',
    paddingLeft: 7.5,
    textAlignVertical: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  closeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    // backgroundColor: "pink",
    justifyContent: 'space-between',
  },
});

export default DropDownPicker;
