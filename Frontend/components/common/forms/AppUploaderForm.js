import React from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';

import ErrorMessage from './ErrorMessage';
import Uploader from './../Uploader';

function AppUploaderForm({name, handleAddFileName}) {
  const {errors, setFieldValue, touched, values} = useFormikContext();
  // const uploaderUri = values[name];
  // const documentdata = values[name];

  const handleAdd = uri => {
    setFieldValue(name, uri);
    // console.log('handel add ', values[name]);
  };

  const handleFileNameAddition = f_name => {};
  const handleRemove = () => {
    setFieldValue(name, null);
    // console.log('handle deter');
    // console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', values[name]);
  };
  return (
    <>
      <View>
        <Uploader
          // uploaderUri={uploaderUri}
          // documentdata = {documentdata}
          onAdd={handleAdd}
          onRemove={handleRemove}
          handleAddFileName={handleAddFileName}
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppUploaderForm;
