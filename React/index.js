import { AppRegistry } from 'react-native';
import App from './News/App';
import AppLiveNews from './LiveNews/AppLiveNews';
import AppProfile from './Profile/AppProfile';

AppRegistry.registerComponent('ZRNNews', () => App);
AppRegistry.registerComponent('ZRNLiveNews', () => AppLiveNews);
AppRegistry.registerComponent('ZRNProfile', () => AppProfile);

