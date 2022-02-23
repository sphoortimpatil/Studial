import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import studialRoutes from '../../api/studialRoutes';
import userRoutes from '../../api/userRoutes';

const {width, height} = Dimensions.get('window');

function BookCard(props) {

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [ext, setExtn] = useState(false);

  useEffect(() => {
    const {likes, dislikes} = props.file;
    const {bookmarked} = props;
    // console.log(props.file, 'file prop');
    // console.log(bookmarked, 'here hhhh');
    // console.log(user);

    const extn = props.file.fileName.split('.').pop();
    // console.log('exytemdfs', extn);
  

    if (extn == 'doc' || extn == 'docx') {
      setExtn(require('../../assets/documenticons/doc.png'));
    } else if (extn == 'pdf') {
      setExtn(require('../../assets/documenticons/pdf.png'));
    } else if (extn == 'ppt' || extn == 'pptx') {
      setExtn(require('../../assets/documenticons/pptx.png'));
    } else {
      setExtn(require('../../assets/documenticons/file.png'));
    }

    if (likes.includes(props.profileUserId)) {
      setLike(true);
    }
    if (dislikes.includes(props.profileUserId)) {
      setDislike(true);
    }
    if (bookmarked.includes(props.id)) {
      setBookmark(true);
    }

    // console.log('extedfsdfsadfsadfssssssssssssssssss', extn);
  }, []);

  const handelLike = async () => {
    // console.log("liked", like);
    // console.log('idddddddddd', props.id);
    await axios
      .put(studialRoutes.upvote, {id: props.id})
      .then(r => {
        // console.log('Resonse', r.data);
        if (like) {
          setLike(false);
        } else if (dislike) {
          setDislike(false);
          setLike(true);
        } else {
          setLike(true);
        }
      })
      .catch(e => console.log(e));

    // console.log('liked', like, dislike);
  };

  const handelDislike = async () => {
    await axios
      .put(studialRoutes.downvote, {id: props.id})
      .then(r => {
        // console.log(r);
        if (like) {
          setLike(false);
        } else if (!dislike) {
          setDislike(true);
        } else {
          setDislike(false);
        }
      })
      .catch(e => console.log(e));

    // console.log('disliked', like, dislike);
  };

  const handeBookmark = async () => {
    await axios
      .put(userRoutes.addbookmarks, {id: props.id})
      .then(r => {
        // console.log('r', r.data);
        setBookmark(!bookmark);
      })
      .catch(e => console.log('e', e));
  };

  const imgsrc = ext;

  return (
    <View style={styles.BookCardWrapper}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.onClick();
        }}>
        <View style={styles.BookCardTop}>
          {imgsrc && (
            <ImageBackground
              source={ext}
              resizeMode="contain"
              style={styles.image}>
              <Text style={styles.text}>{props.file.fileName}</Text>
            </ImageBackground>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.BookCardBottom}>
        {!like && (
          <TouchableWithoutFeedback onPress={() => handelLike()}>
            <Ionicons name="heart-outline" size={28} color="black" />
          </TouchableWithoutFeedback>
        )}
        {like && (
          <TouchableWithoutFeedback onPress={() => handelLike()}>
            <Ionicons name="heart" size={28} color="tomato" />
          </TouchableWithoutFeedback>
        )}
        {!dislike && (
          <TouchableWithoutFeedback onPress={() => handelDislike()}>
            <Ionicons name="heart-dislike-outline" size={28} color="black" />
          </TouchableWithoutFeedback>
        )}
        {dislike && (
          <TouchableWithoutFeedback onPress={() => handelDislike()}>
            <Ionicons name="heart-dislike" size={28} color="#051739" />
          </TouchableWithoutFeedback>
        )}
        {!bookmark && (
          <TouchableWithoutFeedback onPress={() => handeBookmark()}>
            <Ionicons name="bookmark-outline" size={28} color="black" />
          </TouchableWithoutFeedback>
        )}
        {bookmark && (
          <TouchableWithoutFeedback onPress={() => handeBookmark()}>
            <Ionicons name="bookmark" size={28} color="#051739" />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

export default BookCard;

const styles = StyleSheet.create({
  BookCardWrapper: {
    backgroundColor: '#E5E5E5',
    width: width * 0.425,
    height: height * 0.31,
    borderRadius: 20,
    marginVertical: 13,
  },
  BookCardTop: {
    backgroundColor: '#B8D6DE',
    flex: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#051739',
    shadowOffset: {width: -10, height: -2},
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  BookCardBottom: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: width * 0.32,
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: '#c7d4eb',
    backgroundColor: '#133678',
    borderRadius: 7,
    padding: 4,
  },
});
