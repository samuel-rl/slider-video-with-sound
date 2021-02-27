import React from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {ItemVideo} from './SliderVideo';

const {height, width} = Dimensions.get('window');
const StatusBarHeight = StatusBar.currentHeight || 0;

interface FullScreenVideo {
  item: ItemVideo;
  play: boolean;
}

const FullScreenVideo = ({item, play}: FullScreenVideo) => {
  return (
    <Video
      source={item.video}
      style={styles.backgroundVideo}
      muted={true}
      repeat={true}
      resizeMode={'cover'}
      paused={!play}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height + StatusBarHeight,
    width: width,
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

export default FullScreenVideo;
