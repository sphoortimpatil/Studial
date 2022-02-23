import React from 'react';
import DocView from '../components/common/DocumentViewerClass';
import DocumentViewer from '../components/common/Documentviewer';
import axios from 'axios';
import storage from '../auth/storage';
import userRoutes from '../api/userRoutes';

class UploadedFilesScreen extends DocumentViewer {
  state = {
    // books: ["a", "b", "c", "d", "e", "f"],
    books: [],
    bookmarked: false,
    userId: '',
    refreshing: false,
  };

  componentDidMount = async () => {
    this.setState({
      refreshing: true,
    });
    await axios
      .get(userRoutes.uploadedFiles)
      .then(r => {
        // console.log(r.data.data);
        this.setState({
          books: r.data.data,
        });
      })
      .catch(e => console.log(e));
    const userData = await storage.getUser();
    this.setState({
      userId: userData.userId,
    });
    await axios.get(userRoutes.bookmarks).then(r => {
      // console.log(r.data.allBookmarks);
      this.setState({
        bookmarked: r.data.allBookmarks,
      });
    });
    this.setState({
      refreshing: false,
    });
  };

  handleRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await axios
      .get(userRoutes.uploadedFiles)
      .then(r => {
        // console.log(r.data.data);
        this.setState({
          books: r.data.data,
        });
      })
      .catch(e => console.log(e));

    await axios.get(userRoutes.bookmarks).then(r => {
      // console.log(r.data.allBookmarks);
      this.setState({
        bookmarked: r.data.allBookmarks,
      });
    });
    this.setState({
      refreshing: false,
    });
  };

  render() {
    return (
      <DocView
        details={this.state}
        handleRefresh={this.handleRefresh}
        handleGetFile={this.handleGetFile}
      />
    );
  }
}

export default UploadedFilesScreen;
