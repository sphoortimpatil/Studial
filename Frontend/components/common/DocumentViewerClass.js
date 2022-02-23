import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import BookCard from '../common/BookCard';
import Screen from '../common/Screen';


class DocView extends Component {
  render() {
    const {details} = this.props;
    return (
      <Screen>
        <View style={styles.homeWrapper}>
          <View style={styles.homeTop}>{/* <Searchbar></Searchbar> */}</View>

          <View style={styles.homeBottom}>
            {details.books.length == 0 && (
              <Text style={{color: 'white'}}>No books</Text>
            )}

            {details.bookmarked && !details.refreshing && (
              <FlatList
                onRefresh={() => this.props.handleRefresh()}
                refreshing={details.refreshing}
                style={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.row}
                data={details.books}
                keyExtractor={item => item._id.toString()}
                renderItem={({item}) => {
                  return (
                    <BookCard
                      name={item.title}
                      id={item._id}
                      file={item}
                      profileUserId={details.userId}
                      bookmarked={details.bookmarked}
                      userId={item.userId}
                      onClick={() =>
                        this.props.handleGetFile(item._id, item.fileName)
                      }
                    />
                  );
                }}
              />
            )}
          </View>
        </View>
      </Screen>
    );
  }
}

export default DocView;

const styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  homeContainer: {
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
  },
  homeTop: {
    backgroundColor: '#E5E5E5',
    height: 50,
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBottom: {
    backgroundColor: '#051739',

    flex: 2,

    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 32,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // overflow: "scroll",
  },
  list: {
    flex: 1,
    margin: 5,
    // flexDirection:"row",
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
