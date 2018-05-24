import React, { Component, PropTypes } from 'react';
import { FlatList, SectionList, StyleSheet, ScrollView, Image, Text, View, NavigatorIOS, Dimensions } from 'react-native';
import DateUtil from '../Utils/utils';

const kScreenWidth = Dimensions.get('window').width;
const kScreenHeight = Dimensions.get('window').height;
const kNavigationHeight = kScreenHeight == 815 ? 88 : 64;
const kStatuesbarHeight = kScreenHeight == 815 ? 44 : 20;

export default class ZNewsList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newsList: [],
        refreshing: false,
        next_cursor: '',
      };
    }
    render() {
        if (!this.state.newsList) {
          return this.renderLoadingView();
        }

        var items = this.state.newsList;
        return this.renderNewsList(items);

        
    }

    getNewsListFromApi(next_cursor) {
      var url = 'https://api-prod.wallstreetcn.com/apiv1/content/lives?channel=global-channel&limit=20&cursor='
      if (next_cursor != undefined) {
        url = url + next_cursor;
      }
      fetch(url,{
          method: 'GET'
      })
      .then((response) => response.json())
      .then((responseData) => {
        var items = next_cursor ? this.state.newsList : []
        for (let index = 0; index < responseData.data.items.length; index++) {
          var element = responseData.data.items[index];
          items.push(element)
        }
          this.setState({
              newsList:items,
              refreshing: false,
              next_cursor: responseData.data.next_cursor,

          });
          console.log(responseData);
      })
      .catch((error) => {
        this.setState({
          refreshing:false
        });
        console.error(error);
      });
    }

    componentDidMount() {
      this.getNewsListFromApi('');
    }

    renderRefresh = () => {
      this.setState({
        refreshing:true
      });

      // setTimeout(() => {
      //   console.log('No more data!');
      //   refreshing.setState({
      //     refreshing:false
      //   });
      // }, 30000);
      this.getNewsListFromApi();
    }
    renderOnEndReached = () => {
      if (this.state.next_cursor) {
        this.getNewsListFromApi(this.state.next_cursor);
      }
    }
    
    renderLoadingView() {
      return(
        <View style={styles.container}>
          <Text>
            Loading...
          </Text>
        </View>
      );
    }

    renderNewsList(newsList) {
      return(
        <View style={styles.container}>
          <FlatList 
          data = {newsList}
          renderItem={({item}) => 
            <View style={styles.item}>
              <Text style={styles.item_title}>{item.content_text}</Text>
              <Text style={styles.item_subtitle}>{DateUtil.formatDate(item.display_time * 1000,'hh:mm')}</Text>
              {/* <Image style={styles.item_image} source={{uri: item.resource.image_uri + '?imageView2/1/h/150/w/200/q/100'}}/> */}
            </View>
          }
          onEndReached={this.renderOnEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
          onRefresh={this.renderRefresh}
          refreshing={this.state.refreshing}
          />
        </View>
      );
    }

    _renderItemSeparatorComponent = ({highlighted}) => (
      <View style={{ height:0.5, backgroundColor:'#E6E6E6' }}></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: kNavigationHeight,
    flex: 1,
    paddingTop: 0,
    // backgroundColor: '#f2f2f2'
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 114,
    borderColor: 'gray', 
    flex: 1,
  },
  item_title: {
    fontSize: 16,
    lineHeight: 21,
    color: '#333333',
    marginLeft: 15,
    marginTop: 20,
    marginRight: 15,
    paddingRight: 0,
    left: 40,
    width: kScreenWidth - 40 - 15 - 15,
    height: 60,
    maxHeight: 60,
  },
  item_subtitle: {
    fontSize: 13,
    color: '#999',
    paddingRight: 100,
    marginLeft: 15,
    // bottom: -5,
    top: -60,
    width: 40,
    height: 13,
  },
  item_image: {
    marginLeft: kScreenWidth - 100 - 15,
    marginTop: -70,
    width: 100,
    height: 75,
  }
});