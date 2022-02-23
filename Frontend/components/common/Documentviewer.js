import React from 'react';
import * as RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';


import studialRoutes from '../../api/studialRoutes';

class DocumentViewer extends React.Component {
  writeToFile = async (Base64String, file_name) => {
    const path = RNFS.ExternalDirectoryPath + '/' + file_name;
    await RNFS.writeFile(path, Base64String, 'base64')
      .then(success => {
        // console.log('FILE WRITTEN!', path, success);
        this.handleViewFile(path);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  handleViewFile = async path => {
    try {
      await FileViewer.open(path);
    } catch (error) {
      console.log('Err', error);
    }
  };

  handleGetFile = async (id, file_name) => {
    await axios
      .post(studialRoutes.getFile, {id: id})
      .then(r =>
        this.writeToFile(r.data.data[0].uploadData, file_name),
      )
      .catch(e => console.log(e));
  };
}

export default DocumentViewer;
