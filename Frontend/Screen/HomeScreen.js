import DocumentViewer from '../components/common/Documentviewer';
import React from 'react';

import axios from 'axios';
import userRoutes from '../api/userRoutes';
import studialRoutes from '../api/studialRoutes';
import storage from '../auth/storage';
import DocView from '../components/common/DocumentViewerClass';

class Home extends DocumentViewer {
  state = {
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
      .get(studialRoutes.home)
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
      .get(studialRoutes.home)
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
      <>
        {
          <DocView
            details={this.state}
            handleRefresh={this.handleRefresh}
            handleGetFile={this.handleGetFile}
          />
        }
      </>
    );
  }
}

export default Home;
