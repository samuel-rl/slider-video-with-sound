import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Sound from 'react-native-sound';
import {VideoProperties} from 'react-native-video';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import FullScreenVideo from './FullScreenVideo';

export interface ItemVideo {
  video: VideoProperties['source'];
  sound: URL;
}

const items: ItemVideo[] = [
  {
    video: require('../assets/videos/horror1.mp4'),
    sound: require('../assets/sounds/horror1.mp3'),
  },
  {
    video: require('../assets/videos/horror2.mp4'),
    sound: require('../assets/sounds/horror2.mp3'),
  },
  {
    video: require('../assets/videos/horror3.mp4'),
    sound: require('../assets/sounds/horror3.mp3'),
  },
];
const {width} = Dimensions.get('window');

const VideoSlider = () => {
  const [sound, setSound] = useState<Sound | null>(null);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const position = useSharedValue(0);

  useEffect(() => {
    runOnJS(updateSong)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSong = () => {
    if (sound != null) {
      sound.stop();
      sound.release();
      runOnJS(setSound)(null);
    }
    const s = new Sound(items[position.value].sound, () => {
      setSound(s);
      s.play(() => s.release());
    });
  };

  const scrollToNearestItem = (offset: number) => {
    'worklet';
    let minDistance;
    let minDistanceIndex = 0;
    for (let i = 0; i < items.length; ++i) {
      const distance = Math.abs(i * width - offset);
      if (minDistance === undefined) {
        minDistance = distance;
      } else {
        if (distance < minDistance) {
          minDistance = distance;
          minDistanceIndex = i;
        }
      }
    }
    position.value = minDistanceIndex;
    scrollTo(animatedRef, minDistanceIndex * width, 0, true);
  };

  const onScrollHandler = useAnimatedScrollHandler({
    onEndDrag: (e) => {
      scrollToNearestItem(e.contentOffset.x);
    },
    onMomentumEnd: (e) => {
      scrollToNearestItem(e.contentOffset.x);
      runOnJS(updateSong)();
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        ref={animatedRef}
        onScroll={onScrollHandler}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}>
        {items.map((item: ItemVideo, index: number) => {
          return (
            <FullScreenVideo
              key={index.toString()}
              item={item}
              play={position.value === index}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default VideoSlider;
