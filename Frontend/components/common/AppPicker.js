import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerItem from './PickerItem';

function AppPicker({
  iconName,
  items,
  placeholder,
  onSelectItem,
  selectedItem,
  borderRadius = 12,
  height = 42,
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

          {selectedItem ? (
            <Text style={styles.textInput}>{selectedItem}</Text>
          ) : (
            <Text style={[styles.placeholderInput]}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={27}
            color="black"
            style={[styles.icon]}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView>
          <Button onPress={() => setModalVisible(!modalVisible)} title="Close">
            close
          </Button>
          <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </SafeAreaView>
      </Modal>
      {/* {modalVisible && (
				<View animationType="slide" overFullScreen>
					<SafeAreaView>
						<Button
							onPress={() => setModalVisible(!modalVisible)}
							title="Close"
						></Button>
						<FlatList
							data={items}
							keyExtractor={(item) => item.value.toString()}
							renderItem={({ item }) => (
								<PickerItem
									label={item.label}
									onPress={() => {
										setModalVisible(false);
										onSelectItem(item);
									}}
								/>
							)}
						/>
					</SafeAreaView>
				</View>
			)} */}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    // marginRight: 5,
    // paddingRight: 5,
    justifyContent: 'center',
    width: '20%',
    // backgroundColor: "pink",
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
    // height: 60,
    color: 'red',
    fontSize: 18,
    width: '80%',
    paddingLeft: 7.5,
    textAlignVertical: 'center',
  },
});

export default AppPicker;
