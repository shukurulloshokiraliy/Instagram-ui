import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
}

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  timeAgo: string;
}

const HomeScreen = () => {
  // Stories data
  const stories: Story[] = [
    {
      id: '0',
      username: 'Your story',
      avatar: 'https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t',
      hasStory: false,
    },
    {
      id: '1',
      username: 'temurbek_adh...',
      avatar: 'https://static2.vivoo.ru/datas/photos/800x800/4e/4d/cfb9c63ae7bfac9be86119bdf8dd.jpg?0',
      hasStory: true,
    },
    {
      id: '2',
      username: 'xusanboy.omo...',
      avatar: 'https://muzofond.fm/img/collections/449062_big.jpg',
      hasStory: true,
    },
    {
      id: '3',
      username: 'najottalim',
      avatar: 'https://play-lh.googleusercontent.com/ZHi5sCM91D1VVoJpdUmIW1vAInohHU8VdHJeKXARX2uOCCoZ_kPUiMaxQFrbRJOrS4M',
      hasStory: true,
    },
  ];


  const posts: Post[] = [
    {
      id: '1',
      username: 'millymallymoe',
      avatar: 'https://avatars.mds.yandex.net/i?id=cb2c6dc7a4208a6ba83ea467cc1fface1b757f0f-5856211-images-thumbs&n=13',
      image: 'https://i.ytimg.com/vi/C8GoarZbu04/maxresdefault.jpg',
      caption: 'Shokir Yomon',
      likes: 12897,
      timeAgo: '2h',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
        
        <Text style={styles.logo}>Instagram</Text>
        
        <TouchableOpacity>
          <View style={styles.heartIcon}>
            <Text style={styles.heartIconText}>♥</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map((story) => (
              <TouchableOpacity key={story.id} style={styles.storyItem}>
                <View
                  style={[
                    styles.storyBorder,
                    story.hasStory && styles.storyBorderActive,
                  ]}
                >
                  <Image
                    source={{ uri: story.avatar }}
                    style={styles.storyAvatar}
                  />
                  {!story.hasStory && (
                    <View style={styles.addStoryButton}>
                      <Text style={styles.addStoryText}>+</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.storyUsername} numberOfLines={1}>
                  {story.username}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <Image
                  source={{ uri: post.avatar }}
                  style={styles.postAvatar}
                />
                <Text style={styles.postUsername}>{post.username}</Text>
                <Text style={styles.audioText}>• Original audio</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.image }} style={styles.postImage} />

            {/* Post Caption Overlay */}
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>{post.caption}</Text>
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <View style={styles.postActionsLeft}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>♥</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>✈</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.actionIcon}>🔖</Text>
              </TouchableOpacity> 
            </View>

            {/* Likes */}
            <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.profileNavIcon}>
            <Image
              source={{ uri: 'https://via.placeholder.com/30' }}
              style={styles.profileNavImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  addIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  logo: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Billabong',
    fontWeight: '400',
  },
  heartIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconText: {
    fontSize: 26,
    color: '#fff',
  },
  
  // Stories
  storiesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  storyItem: {
    alignItems: 'center',
    marginLeft: 12,
    width: 80,
  },
  storyBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#333',
  },
  storyBorderActive: {
    borderWidth: 3,
    borderColor: '#d62976',
   
  },
  storyAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#000',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  addStoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyUsername: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  
  // Post
  post: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUsername: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  audioText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  moreIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  postImage: {
    width: width,
    height: width * 1.25,
    backgroundColor: '#1a1a1a',
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  captionText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Dancing Script',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  likes: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    marginTop: 4,
  },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#000',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  navButton: {
    padding: 8,
  },
  navIcon: {
    fontSize: 26,
  },
  profileNavIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  profileNavImage: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;