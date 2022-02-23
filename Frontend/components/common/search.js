import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Searchbar() {
  const [inputText, setText] = useState('');
  const [search, setSearch] = useState(false);

  const onSearch = () => {
    if (search === true) {
      setText('');
    }
    setSearch(!search);
    console.log(inputText);
  };

  const handelInputChange = input => {
    setText(input);
    console.log(inputText);
  };

  return (
    <SafeAreaView style={styles.searchWrapper}>
      <TextInput
        style={styles.searchContent}
        onChangeText={text => handelInputChange(text)}
        value={inputText}
        placeholder="Search ..."
        placeholderTextColor="#E5E5E5"></TextInput>
      <TouchableNativeFeedback
        onPress={() => {
          onSearch();
        }}
        background={TouchableNativeFeedback.Ripple('#B8D6DE', true, 50)}>
        <View style={styles.searchIcon}>
          {!search && (
            <MaterialCommunityIcons
              name="magnify"
              size={40}
              color={'#E5E5E5'}></MaterialCommunityIcons>
          )}
          {search && (
            <MaterialCommunityIcons
              name="close-thick"
              size={40}
              color="#E5E5E5"
            />
          )}
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}

export default Searchbar;

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#051739',
    height: 60,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 30,
    marginTop: 22,
  },
  searchIcon: {
    // backgroundColor: "red",
    height: 60,
    width: 52,
    borderRadius: 30,
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContent: {
    // backgroundColor: "green",
    width: 248,
    height: 60,
    flex: 1,
    color: '#E5E5E5',
    //marginRight:10,
    marginLeft: 8,
  },
});
