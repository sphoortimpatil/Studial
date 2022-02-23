import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Platform,
  Modal,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AppText from '../common/AppText';
import BottomModal from '../common/BottomModal';
import FileViewer from 'react-native-file-viewer';
import * as RNFS from 'react-native-fs';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const Uploader = ({onAdd, onRemove, handleAddFileName}) => {
  const [documentUri, setDocumenturi] = useState();
  const [imageUri, setImageUri] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [optionModal, setOptionModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const UserPermissions = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then(response => {
        // setPermissionResult(result);
        console.log(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    UserPermissions();
  }, []);

  const getBase64 = async (file, file_name) => {
    // console.log('converting to base64');
    var Base64String;
    try {
      // console.log('file uri', file);
      Base64String = await RNFS.readFile(file, 'base64');

      onAdd(Base64String);
      handleAddFileName(file_name);
    } catch (error) {
      console.log("Couldn't convet to base 64", error);
    }
  };

  const selectdelete = () => {
    setThumbnail();
    setDocumenturi();
    setImageUri();
    setOptionModal(false);
    onRemove(null);
  };

  const selectView = async () => {
    // console.log('View');
    if (documentUri) {
      try {
        await FileViewer.open(documentUri.uri);
        setOptionModal(false);
      } catch (error) {
        console.log('Error opening ', error);
      }
    } else {
      try {
        await FileViewer.open(thumbnail.path);
        setOptionModal(false);
      } catch (error) {
        console.log('Error opening ', error);
      }
    }
  };

  const selectUpdate = () => {
    // console.log('Modal');
    if (!thumbnail) {
      setModalVisible(!modalVisible);
    } else {
      setModalVisible(false);
      alert('A file has already been Selected');
    }
  };

  const selectOption = () => {
    // console.log('Select');
    setOptionModal(!optionModal);
  };

  const onDocumentPermission = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [types.pdf, types.doc, types.docx, types.ppt, types.pptx],
      });
      setModalVisible(!modalVisible);
      setDocumenturi(result[0]);
      // onAdd(result[0].uri);

      setThumbnail(result[0].name);
      // console.log(result[0]);
      getBase64(result[0].uri, result[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Cancelled', err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const onDocumentSelect = async () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then(res => {
        if (res === RESULTS.GRANTED) {
          // console.log('Permission Granted');
          onDocumentPermission();
        } else {
          UserPermissions();
        }
      })
      .catch(e => {
        console.log('Permission Error');
      });
  };

  const onImagePermission = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      includeExif: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        // console.log('received base64 image', image.data);
        setModalVisible(!modalVisible);
        setThumbnail(image);
        onAdd(image.data);
        // console.log(image);
        var imgName = image.mime.split('/');
        imgName = imgName[0].trim() + '.' + imgName[1].trim();
        handleAddFileName(imgName);
        setImageUri(`data:${image.mime};base64,` + image.data);
      })
      .catch(error => console.log('Error Reading An Image', error));
  };

  const onImageSelect = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then(res => {
        if (res === RESULTS.GRANTED) {
          onImagePermission();
        } else {
          UserPermissions();
        }
      })
      .catch(e => {
        console.log('Permission Error');
      });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={selectUpdate}>
          <View style={styles.uploadContainer}>
            <AppText
              iconName="file-upload"
              iconColor="red"
              borderRadius={15}
              height={53}>
              Upload...
            </AppText>
          </View>
        </TouchableWithoutFeedback>
        {thumbnail && documentUri && (
          <TouchableWithoutFeedback onPress={selectOption}>
            <View style={styles.uploadContainer}>
              <Text style={styles.label}>Uploaded File</Text>
              <AppText
                iconName="file-eye"
                iconColor="red"
                borderRadius={15}
                height={53}>
                {thumbnail}
              </AppText>
            </View>
          </TouchableWithoutFeedback>
        )}
        {thumbnail && imageUri && (
          <TouchableWithoutFeedback onPress={selectOption}>
            <View style={styles.uploadContainer}>
              <Text style={styles.label}>Uploaded File</Text>
              <AppText
                iconName="file-eye"
                iconColor="red"
                borderRadius={15}
                height={53}>
                {thumbnail.mime}
              </AppText>
            </View>
          </TouchableWithoutFeedback>
        )}

        <Modal animated animationType="fade" visible={optionModal} transparent>
          <BottomModal
            title="Select File Type"
            option1="Delete"
            option2="View"
            icon1="file-remove-outline"
            icon2="file-eye-outline"
            onSelect1={selectdelete}
            onSelect2={selectView}
            onOpen={selectOption}
            justifyContent="center"
            borderRadius={22}
          />
        </Modal>
      </View>
      <Modal animated animationType="fade" visible={modalVisible} transparent>
        <BottomModal
          title="Select File Type"
          option1="Document"
          option2="Image"
          icon1="file-check-outline"
          icon2="image-multiple-outline"
          onSelect1={onDocumentSelect}
          onSelect2={onImageSelect}
          onOpen={selectUpdate}
          justifyContent="flex-end"
        />
      </Modal>
    </>
  );
};

export default Uploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  uploadContainer: {
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    color: '#E5E5E5',
  },
  thumbnailPreview: {
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  thumbnailInfo: {
    color: 'darkblue',
  },
  thumbnailError: {
    color: 'crimson',
  },
});
