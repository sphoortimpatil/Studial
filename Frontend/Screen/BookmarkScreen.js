import React, {Component} from 'react';
import DocumentViewer from '../components/common/Documentviewer';
import DocView from '../components/common/DocumentViewerClass';

import axios from 'axios';
import userRoutes from '../api/userRoutes';
import storage from '../auth/storage';

class BookMarkScreen extends DocumentViewer {
  componentDidMount = async () => {
    this.setState({
      refreshing: true,
    });
    await axios.get(userRoutes.bookmarks).then(r => {
      // console.log(r.data.data);
      this.setState({
        books: r.data.data,
      });
    });
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
    await axios.get(userRoutes.bookmarks).then(r => {
      // console.log(r.data.data);
      this.setState({
        books: r.data.data,
      });
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

  state = {
    // books: ["a", "b", "c", "d", "e", "f"],
    books: [],
    bookmarked: false,
    userId: '',
    refreshing: false,
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

export default BookMarkScreen;
