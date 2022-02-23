import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Yup from 'yup';
import axios from 'axios';

import RegisterAnimation from '../components/animations/RegisterAnimation';
import {
  AppForm,
  AppFormField,
  AppSelectorForm,
  SubmitButton,
} from '../components/common/forms';
import Screen from '../components/common/Screen';
import authRoutes from '../api/authRoutes';
import storage from '../auth/storage';
import userAuth from './../auth/userAuth';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  sem: Yup.object().required('Select Semester').label('Sem'),
  department: Yup.object().required('Select Department').label('Dep'),
  password: Yup.string().required().min(6).label('Password'),
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
function RegisterScreen(props) {
  const {login} = userAuth();
  // const [pickedSem, setPickedSem] = useState();
  // const [pickedDep, setPickedDep] = useState();
  const onSubmitRegister = values => {
    // console.log(values);
    axios
      .post(authRoutes.register, values)
      .then(r => {
        const token = r.data.token;
        login(token);
        axios.defaults.headers.common['x-auth-token'] = r.data.token;
        storage.storeToken(token);
        // console.log('res', r.data);
      })
      .catch(e => {
        console.log('error', e.message);
      });
  };
  return (
    <Screen>
      <View style={styles.Registercontainer}>
        <View style={styles.top}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.registerIcon}
              source={require('../assets/logo/studialLogo.png')}
            />
          </View>

          <View style={styles.animation}>
            <RegisterAnimation />
          </View>
        </View>
        <ScrollView>
          <View style={styles.bottom}>
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
                    name: '',
                    email: '',
                    department: '',
                    sem: '',
                    password: '',
                  }}
                  onSubmit={values => onSubmitRegister(values)}
                  validationSchema={validationSchema}>
                  <>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>Name</Text>
                      <AppFormField
                        // autoCapitalize="true"
                        autoCorrect={false}
                        placeholder="Name..."
                        name="name"
                        borderRadius={12}
                        height={42}
                        secureTextEntry={false}
                      />
                      {/* <Text style={{ color: "red" }}>{errors.email}</Text> */}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>Email</Text>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Email..."
                        name="email"
                        borderRadius={12}
                        height={42}
                        secureTextEntry={false}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <View style={styles.viewWrapper}>
                        <View style={styles.dep}>
                          <Text style={styles.label}>Department</Text>
                          <AppSelectorForm
                            items={departmentList}
                            placeholder="Select Dep..."
                            // selectedItem={pickedDep}
                            // onSelectItem={(item) => setPickedDep(item)}
                            name="department"
                            fontSize={14}
                          />
                        </View>
                        <View style={styles.sem}>
                          <Text style={styles.label}>Semester</Text>
                          <AppSelectorForm
                            items={semList}
                            placeholder="Select Sem..."
                            name="sem"
                            fontSize={14}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.password}>
                      <Text style={styles.label}>Password</Text>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Password..."
                        name="password"
                        borderRadius={12}
                        height={42}
                        secureTextEntry={true}></AppFormField>
                    </View>
                    <View style={styles.logButton}>
                      <SubmitButton
                        title="Sign Up"
                        backgroundColor="#85be41"
                        padding="9%"
                        // marginBottom={20}
                      />
                    </View>
                  </>
                </AppForm>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  Registercontainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051739',
    fontSize: 18,
    // marginTop: StatusBar.currentHeight,
  },
  top: {
    display: 'flex',
    height: 340,
    // justifyContent: "flex-end",
    // backgroundColor: "red",
    // marginTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  iconWrapper: {
    color: 'white',
    fontSize: 25,
    display: 'flex',
    height: 100,
    width: '100%',
    marginTop: 15,
    // backgroundColor:"green",
  },
  registerIcon: {
    // flex: 1,
    width: 180,
    height: 100,
    // height:"20%",
    resizeMode: 'contain',
    // backgroundColor: "pink",
  },
  animation: {
    display: 'flex',
    height: 240,
    // backgroundColor: "pink",
  },
  bottom: {
    // height: 440,
    height: '97%',
    width: Dimensions.get('window').width,
    // backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    // marginBottom:StatusBar.currentHeight,
  },

  name: {
    color: 'white',
    fontSize: 20,
    display: 'flex',
    // height: "30%",
    paddingLeft: 15,
    // backgroundColor: "red",
  },
  icon: {
    // flex: 1,
    width: 180,
    height: 50,
    // height:"20%",
    resizeMode: 'contain',
    // backgroundColor: "black",
  },

  textContainer: {
    width: '85%',
    // backgroundColor: "blue",
    fontSize: 18,
    marginBottom: 5,
    // alignItems:"center",
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#E5E5E5',
    marginLeft: 10,
    // backgroundColor:"pink",
  },
  viewWrapper: {
    width: '100%',
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dep: {
    width: '49%',
    // flexDirection: "row",
    // backgroundColor: "pink",
  },
  sem: {
    width: '49%',
    // backgroundColor: "red",
  },
  password: {
    width: '85%',
    // backgroundColor: "green",
    marginBottom: 20,
  },

  logButton: {
    width: '35%',
  },
  selector: {
    // height: 200,
    flex: 1,
    width: '40%',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});
export default RegisterScreen;
