import React, { Component, PropTypes } from 'react';
import DateUtil from '../Utils/utils';
import { 
  FlatList, 
  SectionList, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Text, 
  View, 
  NavigatorIOS,
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import Swiper from 'react-native-swiper';

const kScreenWidth = Dimensions.get('window').width;
const kScreenHeight = Dimensions.get('window').height;
const kNavigationHeight = (kScreenHeight == 815 ? 88 : 64);
const kStatuesbarHeight = (kScreenHeight == 815 ? 44 : 20);

var {
  NativeModules
} = require('react-native');
var RNBridgeModule = NativeModules.RNBridgeModule;

export default class ZNewsList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newsList: [],
        carouselList: [],
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
        var url = 'https://api-prod.wallstreetcn.com/apiv1/content/fabricate-articles?channel=global&accept=article&limit=10&cursor=' + next_cursor;
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

    getCarouselListFromApi() {
      var url = 'http://api-prod.wallstreetcn.com/apiv1/content/fabricate-articles?limit=5&channel=global&accept=article';
      fetch(url, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseData) => {
          var items
          for (let index = 0; index < responseData.data.items.length; index++){
            var element = responseData.data.items[index];
            items.push(element)
          }
          this.state({
            carouselList:items,
          })
      })
      .catch((error) => {
        this.state({
          refreshing:false
        });
        console.error(error);
      })
    }

    componentDidMount() {
      this.getCarouselListFromApi();
      this.getNewsListFromApi('');
    }

    renderRefresh = () => {
      this.setState({
        refreshing:true
      });
      this.getCarouselListFromApi();
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
          <FlatList style={styles.news_list}
          data = {newsList}
          renderItem={({item, index}) => 
            <TouchableOpacity onPress={() => this._flatListOnPress(item)}>
              <View style={styles.item_type_news}>
                <Text style={styles.item_title} numberOfLines={2}>{item.resource.title}</Text>
                <Text style={styles.item_subtitle}>{item.resource.author.display_name} | {DateUtil.formatDate(item.resource.display_time * 1000,null)}</Text>
                <Image style={styles.item_image} source={{uri: item.resource.image_uri + '?imageView2/1/h/150/w/200/q/100'}}/>
              </View>
            </TouchableOpacity>
          }
          onEndReached={this.renderOnEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
          onRefresh={this.renderRefresh}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this._headerComponent}
          />
        </View>
      );
    }

    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:0.5, backgroundColor:'#E6E6E6' }}></View>
    );

    _flatListOnPress = (item) => {
      console.log(item)
      RNBridgeModule.OpenNewsDetail(item.resource.uri)
    };

    _headerComponent= () => {
      if (this.state.newsList.length) {
        return(
          <View>
              <Swiper 
              style={styles.swiper} 
              showsButtons={false} 
              autoplay={true}
              dotStyle={styles.swiper_dot}
              activeDotStyle={styles.swiper_activeDot} 
              removeClippedSubviews={false}
              >
                {this._swiperSubview()}
              </Swiper>
          </View>
        )
      } else {
        return(
          <View></View>
        )
      }};

      _swiperSubview() {
        var viewArr = [];
        for (var index = 0; index < 5; index++) {
          let item = this.state.newsList[index];
            viewArr.push(
              <TouchableOpacity onPress={() => this._flatListOnPress(item)}>
                <View style={styles.slide}>
                  <Image style={styles.slide_image} source={{uri: item.resource.image_uri + '?imageView2/1/h/750/w/430/q/100'}}/>
                  <Text style={styles.slide_title}>{item.resource.title}</Text>
                </View>
              </TouchableOpacity>
            );
        }
        return viewArr;
      }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 0,
      marginBottom: 0,
      flex: 1,
      paddingTop: 0,
    },
    news_list: {

    },
    item_type_news: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 114,
      borderColor: 'gray', 
      flex: 1,
    },
    item_type_article: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 144,
      borderColor: 'gray', 
      flex: 1,
    },
    item_title: {
      fontSize: 16,
      lineHeight: 21,
      color: '#333333',
      marginLeft: 15,
      marginTop: 20,
      marginRight: 100 + 15 + 10,
      paddingRight: 0,
      height: 60,
      maxHeight: 60,
    },
    item_subtitle: {
      fontSize: 12,
      color: '#666',
      paddingRight: 10,
      marginLeft: 15,
      bottom: -5,
      width: kScreenWidth - 15 - 10 - 100 - 15,
      height: 13,
    },
    item_image: {
      marginLeft: kScreenWidth - 100 - 15,
      marginTop: -70,
      width: 100,
      height: 75,
    },
    swiper:{
      height: 180,
      backgroundColor: '#FFFFFF',
    },
    swiper_dot: {
      backgroundColor:'#E6E6E6', 
      width: 6, 
      height: 6,
      top: 35,
    },
    swiper_activeDot: {
      backgroundColor:'#1482f0', 
      width: 6, 
      height: 6,
      top: 35,
    },
    slide: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F2F2',
      height: 170,
    },
    slide_image: {
      top: 10,
      width:kScreenWidth,
      height: 180,
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide_title: {
      top: -20,
      fontSize: 16,
      lineHeight: 21,
      color: '#ffffff',
    }
});