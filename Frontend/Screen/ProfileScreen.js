import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  check,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import AppText from '../components/common/AppText';
import Screen from '../components/common/Screen';
import routes from '../navigaton/routes';
import userAuth from './../auth/userAuth';
import storage from '../auth/storage';

function ProfileScreen({navigation}) {
  const {logOut} = userAuth();

  const gettingUser = async () => {
    const userData = await storage.getUser();
    // console.log(userData);
    setUser(userData);
  };

  useEffect(() => {
    requestPermissions();
    gettingUser();
  }, []);
  const [user, setUser] = useState('Loading...');
  const [isSelectImage, setIisSelectImage] = useState(false);

  const [imageUri, setImageUri] = useState();

  const requestPermissions = () => {

    requestMultiple([
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      // console.log(statuses);
      // console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
      console.log(
        'Storage',
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
      );
    });
  };

  const selectOption = () => {
    Alert.alert('Select Profile Image', 'What do you need to do ?', [
      {text: 'New Image', onPress: () => selectImage()},
      {text: 'Default Image ', onPress: () => setIisSelectImage(false)},
    ]);
  };
  const selectImage = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ).then(result => {
      if (result === RESULTS.GRANTED) {
        ImagePicker.openPicker({
          width: 150,
          height: 150,
          cropping: true,
          includeBase64: true,
          includeExif: true,
        })
          .then(image => {
            // console.log('received base64 image');

            setImageUri(`data:${image.mime};base64,` + image.data);
            setIisSelectImage(true);
          })
          .catch(error => console.log('Error Reading An Image', error));
      } else {
        Alert.alert(
          'Acess Image Library',
          'You need to enable permissions to access library',
          [
            {text: 'Cancel', onPress: () => requestPermissions()},
            {text: 'Ok', onPress: () => requestPermissions()},
          ],
        );
      }
    });
  };


  const handelUpload = () => {
    console.log('Upload Menue');
  };

  return (
    <Screen>
      <View style={styles.ProfileWrapper}>
        <View style={styles.title}>
          <Text style={styles.titleFont}>Profile</Text>
        </View>
        <View style={styles.profileTopWrapper}>
          <TouchableWithoutFeedback onPress={selectOption}>
            <View style={styles.selectImage}>
              {!isSelectImage && (
                <Image
                  source={require('../assets/Images/profileIcon.png')}
                  style={{width: 142, height: 180, borderRadius: 80}}
                />
              )}
              {isSelectImage && (
                <Image
                  source={{uri: imageUri}}
                  style={{width: 142, height: 150, borderRadius: 80}}
                />
              )}
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.profileTopRight}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Name :</Text>
              <Text style={styles.subTitleFont}>{user.name}</Text>
            </View>

            <View style={styles.infoDepSem}>
              <View>
                <Text style={styles.label}>Department :</Text>
                <Text style={styles.subTitleFont}>{user.department}</Text>
              </View>
              <View>
                <Text style={styles.label}>Semester :</Text>
                <Text style={styles.subTitleFont}>{user.semester}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.profileBottomWrapper}>
          <View style={styles.profileBottomInfo}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.BOOKMARKS)}>
              <View style={styles.textContainer}>
                <AppText
                  iconName="bookmark-multiple"
                  iconColor="green"
                  marginVertical={0}>
                  Book Marks
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(routes.UPLOAD)}>
              <View style={styles.textContainer}>
                <AppText
                  iconName="file-upload"
                  iconColor="red"
                  borderRadius={0}
                  marginVertical={0}>
                  Improve Collection ? Upload...
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handelUpload}>
              <View style={styles.textContainer}>
                <AppText
                  iconName="account-settings"
                  iconColor="red"
                  borderRadius={0}
                  marginVertical={0}>
                  Edit Profile
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate(routes.ABOUT)}>
              <View style={styles.textContainer}>
                <AppText
                  iconName="information-variant"
                  iconColor="red"
                  borderRadius={0}
                  marginVertical={0}>
                  About
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logOut()}>
              <View style={styles.textContainer}>
                <AppText iconName="logout" iconColor="red" marginVertical={0}>
                  Logout
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.name}>
            <Image
              style={styles.icon}
              source={require('../assets/logo/studialLogo.png')}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfileWrapper: {
    backgroundColor: '#051739',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // marginTop: StatusBar.currentHeight,
  },
  title: {
    height: '10%',
    // backgroundColor: "green",
    justifyContent: 'center',
    paddingLeft: 25,
  },
  titleFont: {
    fontSize: 32,
    color: 'white',
    // textAlign: "center",
  },
  profileTopWrapper: {
    height: '22%',
    backgroundColor: '#E5E5E5',
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 7,
    borderRadius: 25,
  },

  selectImage: {
    backgroundColor: 'black',
    width: '35%',
    height: '95%',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#051739',
  },
  profileTopRight: {
    // backgroundColor: "grey",
    width: '61%',
    height: '95%',
    marginLeft: 7,
  },
  profileBottomWrapper: {
    // marginTop: 40,
    height: '60%',
    marginTop: 28,
    width: '97%',
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  profileBottomInfo: {
    height: '72%',
    width: '100%',
    backgroundColor: '#E5E5E5',
    padding: 5,
    borderRadius: 22,
    marginBottom: 10,
  },
  infoContainer: {
    width: '100%',
    // backgroundColor: 'red',
    fontSize: 18,
    marginBottom: 18,
    // alignItems:"center",
    justifyContent: 'center',
  },
  infoDepSem: {
    width: '100%',
    // backgroundColor: "red",
    fontSize: 18,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  label: {
    fontSize: 20,
    color: 'black',
    // marginLeft: 10,
    // backgroundColor:"pink",
  },

  subTitleFont: {
    fontSize: 18,
    color: 'black',
    // marginLeft: 10,
  },
  textContainer: {
    width: '100%',
    fontSize: 18,
    // marginBottom: 20,
    // alignItems:"center",
    justifyContent: 'center',
  },

  name: {
    color: 'white',
    fontSize: 20,
    display: 'flex',
    // height: "30%",
    paddingLeft: 15,
    // backgroundColor: "red",
    alignItems: 'center',
  },
  icon: {
    // flex: 1,
    width: 180,
    height: 100,
    // height:"20%",
    resizeMode: 'contain',
    // backgroundColor: "black",
  },
});
