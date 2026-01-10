import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const TemurbekScreen = () => {
  const router = useRouter();
  const [progress] = useState(new Animated.Value(0));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000, // 5 seconds story duration
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          router.back();
        }
      });
    }

    return () => {
      progress.stopAnimation();
    };
  }, [isPaused]);

  const handlePress = () => {
    router.back();
  };

  const handleLongPressIn = () => {
    setIsPaused(true);
    progress.stopAnimation();
  };

  const handleLongPressOut = () => {
    setIsPaused(false);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Story Image */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        onLongPress={handleLongPressIn}
        onPressOut={handleLongPressOut}
        style={styles.storyContainer}
      >
        <Image
          source={{ uri: 'https://i.ytimg.com/vi/YkDjts4DKFw/maxresdefault.jpg' }}
          style={styles.storyImage}
          resizeMode="cover"
        />

        {/* Top Gradient Overlay */}
        <View style={styles.topGradient}>
          {/* Progress Bar */}
          <SafeAreaView style={styles.progressBarContainer}>
            <View style={styles.progressBarWrapper}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    { width: progressWidth },
                  ]}
                />
              </View>
            </View>

            <View style={styles.userInfoContainer}>
              <View style={styles.userInfo}>
                <Image
                  source={{
                    uri: 'https://static2.vivoo.ru/datas/photos/800x800/4e/4d/cfb9c63ae7bfac9be86119bdf8dd.jpg?0',
                  }}
                  style={styles.userAvatar}
                />
                <View style={styles.userTextContainer}>
                  <Text style={styles.username}>temurbek_adh</Text>
                  <Text style={styles.timeAgo}>2h ago</Text>
                </View>
              </View>

              <TouchableOpacity onPress={handlePress} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        
        <View style={styles.bottomGradient}>
      
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>
              Check out this amazing view! 🌄
            </Text>
          </View>

     
          <SafeAreaView style={styles.replyContainer}>
            <TouchableOpacity style={styles.replyInput}>
              <Text style={styles.replyPlaceholder}>Send message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton}>
              <Text style={styles.likeIcon}>♡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareIcon}>➤</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  storyImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
    justifyContent: 'flex-end',
  },
  progressBarContainer: {
    paddingTop: 8,
  },
  progressBarWrapper: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  userTextContainer: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  captionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  captionText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  replyInput: {
    flex: 1,
    height: 44,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  replyPlaceholder: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  likeButton: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '300',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default TemurbekScreen;