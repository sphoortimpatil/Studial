import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewAnimated from '../animatedIcons/AddNewAnimated';

function AddNewIcon({onPress, accessibilityState}) {
  // useEffect(() => {
  //   console.log('ppppppppppppppppppppppppp', accessibilityState);
  // });
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.container}>
        {!accessibilityState['selected'] && (
          <MaterialCommunityIcons name="plus" size={47} color="#B93F56" />
        )}
        {accessibilityState['selected'] && (
          <AddNewAnimated accessibilityState={accessibilityState['selected']} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddNewIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#374F81',
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 27,
    borderColor: 'white',
    borderWidth: 12,
    justifyContent: 'center',
  },
});
