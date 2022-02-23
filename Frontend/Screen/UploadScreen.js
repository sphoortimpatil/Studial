import React, {useState, useEffect} from 'react';
import {Text, Image, View, StyleSheet, ScrollView} from 'react-native';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormField,
  AppSelectorForm,
  SubmitButton,
} from '../components/common/forms';
import axios from 'axios';

import AppUploaderForm from '../components/common/forms/AppUploaderForm';
import Screen from '../components/common/Screen';
import UploadPaperPlaneAnimation from '../components/animations/UploadPaperPlaneAnimation';
import apiUrl from './../api/client';
import routes from '../navigaton/routes';

const validationSchema = Yup.object().shape({
  department: Yup.object().required().label('Dep'),
  sem: Yup.object().required().label('Sem'),
  type: Yup.object().required().label('Type'),
  subject: Yup.string().required().label('Subject'),
  title: Yup.string().required().label('Title'),
  upload: Yup.string()
    .required('Document is required,Upload to Proceed')
    .nullable()
    .label('File '),
});

const semList = [
  {label: 'I', value: 1},
  {label: 'II', value: 2},
  {label: 'III', value: 3},
  {label: 'IV', value: 4},
  {label: 'V', value: 5},
  {label: 'VI', value: 6},
  {label: 'VII', value: 7},
  {label: 'VIII', value: 8},
  {label: 'None', value: 9},
];

const departmentList = [
  {label: 'A&R', value: 'A&R'},
  {label: 'Biotech', value: 'Biotech'},
  {label: 'Civil', value: 'Civil'},
  {label: 'CSE', value: 'CSE'},
  {label: 'E&C', value: 'E&C'},
  {label: 'EEE', value: 'EEE'},
  {label: 'Mechanical', value: 'Mechanical'},
  {label: 'None', value: 'None'},
];

const typeList = [
  {label: 'L. P.', value: 'LP'},
  {label: 'Question Paper', value: 'QP'},
  {label: 'Notes', value: 'Notes'},
];

function UploadScreen({navigation}) {
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const handleAddFileName = f_name => {
    // console.log('uploadscreeen', f_name);
    setFileName(f_name);
  };

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.animation}>
              <UploadPaperPlaneAnimation />
            </View>
          </View>
          <ScrollView>
            <View style={styles.containerWrapper}>
              <ScrollView>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',

                    marginBottom: 20,
                    flex: 1,
                  }}>
                  <AppForm
                    initialValues={{
                      department: '',
                      sem: '',
                      type: '',
                      subject: '',
                      type: '',
                      title: '',
                      upload: '',
                    }}
                    onSubmit={values => {
                      values['fileName'] = fileName;

                      axios
                        .post(apiUrl + 'studial/upload', values)
                        .then(r => {
                          console.log('Resssssssss', r.data);
                        })

                        .catch(e => console.log('errr', e));
                    }}
                    validationSchema={validationSchema}>
                    <View style={styles.email}>
                      <View style={styles.dep}>
                        <Text style={styles.label}>Department</Text>
                        <AppSelectorForm
                          items={departmentList}
                          placeholder="Select a Department..."
                          // selectedItem={pickedDep}
                          // onSelectItem={(item) => setPickedDep(item)}
                          name="department"
                          fontSize={14}
                          height={46}
                        />
                      </View>
                    </View>
                    <View style={styles.viewWrapper}>
                      <View style={styles.sem}>
                        <Text style={styles.label}>Semester</Text>
                        <AppSelectorForm
                          items={semList}
                          placeholder="Select Sem..."
                          name="sem"
                          fontSize={14}
                          height={46}
                        />
                      </View>

                      <View style={styles.sem}>
                        <Text style={styles.label}>Type</Text>
                        <AppSelectorForm
                          items={typeList}
                          placeholder="Select Type..."
                          name="type"
                          fontSize={14}
                          height={46}
                        />
                      </View>
                    </View>

                    <View style={styles.email}>
                      <Text style={styles.label}>Subject</Text>
                      <AppFormField
                        // autoCapitalize={true}

                        placeholder="Subject..."
                        name="subject"
                        borderRadius={15}
                        height={49}
                        secureTextEntry={false}></AppFormField>
                    </View>

                    <View style={styles.email}>
                      <Text style={styles.label}>Title</Text>
                      <AppFormField
                        // autoCapitalize={true}

                        placeholder="Title..."
                        name="title"
                        borderRadius={15}
                        height={49}
                        secureTextEntry={false}></AppFormField>
                    </View>

                    <View style={styles.email}>
                      <Text style={styles.label}>Upload</Text>

                      <AppUploaderForm
                        name="upload"
                        handleAddFileName={handleAddFileName}
                      />
                    </View>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <View style={styles.logButton}>
                        <SubmitButton
                          title="Upload"
                          backgroundColor="#85be41"
                          padding="9%"
                          marginBottom={20}
                        />
                      </View>
                    </View>
                    {/* </View> */}
                  </AppForm>

                  {/* <Uploader /> */}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Screen>
    </>
  );
}

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '100%',

    // height: '100%',
    backgroundColor: '#051739',
  },
  top: {
    display: 'flex',
    height: 100,
    width: '100%',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    // marginTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  animation: {
    display: 'flex',
    height: 100,
    // backgroundColor: "pink",
  },
  containerWrapper: {
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewWrapper: {
    width: '97%',
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    // paddingRight: 8,
    // paddingLeft: 1,
  },
  dep: {
    width: '100%',
    // flexDirection: "row",
    // backgroundColor: "pink",
  },
  sem: {
    width: '49%',
    // backgroundColor: "red",
  },
  email: {
    width: '97%',
    // backgroundColor: "blue",
    fontSize: 18,
    marginBottom: 5,
    // alignItems:"center",
    justifyContent: 'center',
  },

  uploadContainer: {
    width: '100%',
    backgroundColor: 'red',
    fontSize: 18,
    marginBottom: 20,
    // alignItems:"center",
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#E5E5E5',
    marginLeft: 10,
    // backgroundColor:"pink",
  },
  thumbnailPreview: {
    padding: 20,
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
  logButton: {
    width: '35%',
  },
});
