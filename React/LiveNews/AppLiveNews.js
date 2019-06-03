import React, { Component, PropTypes } from 'react';
import { FlatList, SectionList, StyleSheet, ScrollView, Image, Text, View, NavigatorIOS, Dimensions, TouchableOpacity } from 'react-native';
import DateUtil from '../Utils/utils';
import  MeasureText  from 'react-native-text-size';

const kScreenWidth = Dimensions.get('window').width;
const kScreenHeight = Dimensions.get('window').height;
const kNavigationHeight = kScreenHeight == 815 ? 88 : 64;
const kStatuesbarHeight = kScreenHeight == 815 ? 44 : 20;

var {
  NativeModules
} = require('react-native');
var RNBridgeModule = NativeModules.RNBridgeModule;

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
          var titleSize = MeasureText.measure({
            texts: [element.content_text],
            width: (kScreenWidth - 40 - 15 - 15),
            fontSize:16});
          element.titleSize = titleSize;
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
          renderItem={({item, index}) => 
            <TouchableOpacity onPress={() => this._flatListOnPress(item)}>
              <View style={styles.item}>
              <Text style={[styles.item_title, fontColorWithScore(item)]} numberOfLines={0}>{item.content_text}</Text>
              <Text style={[styles.item_subtitle, fontColorWithScore(item)]} numberOfLines={0}>{DateUtil.formatDate(item.display_time * 1000,'hh:mm')}</Text>
              {/* <Image style={styles.item_image} source={{uri: 'https://wpimg.wallstcn.com/29c9835c-3fe7-43ab-b4f4-94a6a0d2df38.png' + '?imageView2/1/h/150/w/200/q/100'}}/> */}
              </View>  
            </TouchableOpacity>
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

  _flatListOnPress = (item) => {
    console.log(item)
    var url = 'https://m.wallstreetcn.com/livenews/' + item.id
    RNBridgeModule.OpenNewsDetail(url)
  };
}

function fontColorWithScore(item) {
  if (item.score === 3 ) {
    return styles.item_title_color_red;
  } else if (item.score === 2) {
    return styles.item_title_color_orange;
  } else {
    return styles.item_title_color_normal;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    flex: 1,
    paddingTop: 0,
    // backgroundColor: '#f2f2f2'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'gray', 
    flex: 0,
  },
  item_title: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    left: 40,
    bottom: 0,
    width: kScreenWidth - 40 - 15 - 15,
  },
  item_subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#999',
    left: - kScreenWidth + 50,
    top: 13,
    width: 45,
    height: 40,
  },
  item_title_color_red: {
    color: 'red',
  },
  item_title_color_orange: {
    color: 'orange',
  },
  item_title_color_normal: {

  },
  item_image: {
    marginLeft: -kScreenWidth + 55,
    top: 100,
    width: 100,
    height: 75,
  },
  item_image_hidden: {
    top: window.height,
    bottom: -window.height
  }
});