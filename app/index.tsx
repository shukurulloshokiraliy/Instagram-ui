import { Link } from 'expo-router';
import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";

const { width } = Dimensions.get("window");

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
}

interface FooterIcon {
  id: string;
  icon: string;
  name: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const stories: Story[] = [
    {
      id: "0",
      username: "Your story",
      avatar: "https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t",
      hasStory: false,
    },
    {
      id: "1",
      username: "temurbek_adh...",
      avatar: "https://static2.vivoo.ru/datas/photos/800x800/4e/4d/cfb9c63ae7bfac9be86119bdf8dd.jpg?0",
      hasStory: true,
    },
    {
      id: "2",
      username: "xusanboy.omo...",
      avatar: "https://muzofond.fm/img/collections/449062_big.jpg",
      hasStory: true,
    },
    {
      id: "3",
      username: "najottalim",
      avatar: "https://play-lh.googleusercontent.com/ZHi5sCM91D1VVoJpdUmIW1vAInohHU8VdHJeKXARX2uOCCoZ_kPUiMaxQFrbRJOrS4M",
      hasStory: true,
    },
  ];

  const actionIcons: FooterIcon[] = [
    { id: "1", name: "like", icon: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png" },
    { id: "2", name: "comment", icon: "https://cdn-icons-png.flaticon.com/512/1380/1380338.png" },
    { id: "3", name: "share", icon: "https://cdn-icons-png.flaticon.com/512/3024/3024593.png" },
  ];

  const navIcons: FooterIcon[] = [
    { id: "1", name: "home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png" },
    { id: "2", name: "search", icon: "https://cdn-icons-png.flaticon.com/512/3031/3031293.png" },
    { id: "3", name: "add", icon: "https://cdn-icons-png.flaticon.com/512/1237/1237946.png" },
    { id: "4", name: "reels", icon: "https://cdn-icons-png.flaticon.com/512/2991/2991195.png" },
  ];

  const defaultPostImage = "https://i.ytimg.com/vi/_fVFV9wGOf4/maxresdefault.jpg";

  const getUserInfo = () => ({
    username: "Api-Users",
    avatar: "https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      
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
      
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map((story) => {
              let storyRoute = "/";
              if (story.id === "1") storyRoute = "/temurbek";
              else if (story.id === "2") storyRoute = "/xusanboy";
              else if (story.id === "3") storyRoute = "/najottalim";

              return (
                <Link key={story.id} href={storyRoute} asChild>
                  <TouchableOpacity style={styles.storyItem}>
                    <View style={[styles.storyBorder, story.hasStory && styles.storyBorderActive]}>
                      <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
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
                </Link>
              );
            })}
          </ScrollView>
        </View>

       
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          posts.map((post) => {
            const userInfo = getUserInfo();

            return (
              <View key={post.id} style={styles.post}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <View style={styles.postHeaderLeft}>
                    <Image source={{ uri: userInfo.avatar }} style={styles.postAvatar} />
                    <Text style={styles.postUsername}>{userInfo.username}</Text>
                    <Text style={styles.audioText}>• Original audio</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.moreIcon}>⋮</Text>
                  </TouchableOpacity>
                </View>

                {/* Post Image */}
                <Image source={{ uri: defaultPostImage }} style={styles.postImage} />

                {/* Title Overlay on Image */}
                <View style={styles.captionOverlay}>
                  <Text style={styles.captionText} numberOfLines={2}>
                    {post.title}
                  </Text>
                </View>

                {/* Action Icons */}
                <View style={styles.postActions}>
                  <View style={styles.postActionsLeft}>
                    {actionIcons.map((icon) => (
                      <TouchableOpacity key={icon.id} style={styles.actionButton}>
                        <Image source={{ uri: icon.icon }} style={styles.actionIconImage} />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: "https://cdn-icons-png.flaticon.com/512/5662/5662990.png" }}
                      style={styles.actionIconImage}
                    />
                  </TouchableOpacity>
                </View>

                {/* Likes */}
                <Text style={styles.likes}>{post.reactions.likes.toLocaleString()} likes</Text>

                {/* Views */}
                <Text style={styles.views}>{post.views.toLocaleString()} views</Text>

                {/* Caption */}
                <View style={styles.captionContainer}>
                  <Text style={styles.captionUsername}>{userInfo.username}</Text>
                  <Text style={styles.captionBody} numberOfLines={2}>
                    {post.body}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navIcons.map((navIcon) => (
          <TouchableOpacity key={navIcon.id} style={styles.navButton}>
            <Image source={{ uri: navIcon.icon }} style={styles.navIconImage} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.profileNavIcon}>
            <Image source={{ uri: "https://via.placeholder.com/30" }} style={styles.profileNavImage} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
  },
  addIcon: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
  },
  logo: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Billabong",
    fontWeight: "400",
  },
  heartIcon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIconText: {
    fontSize: 26,
    color: "#fff",
  },
  storiesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  storyItem: {
    alignItems: "center",
    marginLeft: 12,
    width: 80,
  },
  storyBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#333",
  },
  storyBorderActive: {
    borderWidth: 3,
    borderColor: "#d62976",
  },
  storyAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: "#000",
  },
  addStoryButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  addStoryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  storyUsername: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  post: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUsername: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  audioText: {
    color: "#999",
    fontSize: 12,
    marginLeft: 4,
  },
  moreIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  postImage: {
    width: width,
    height: width * 1.25,
    backgroundColor: "#1a1a1a",
  },
  captionOverlay: {
    position: "absolute",
    bottom: 140,
    left: 16,
    right: 16,
  },
  captionText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postActionsLeft: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 16,
  },
  actionIconImage: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  likes: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  views: {
    color: "#999",
    fontSize: 12,
    paddingHorizontal: 12,
    marginTop: 2,
  },
  captionContainer: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  captionUsername: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  captionBody: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#000",
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  navButton: {
    padding: 8,
  },
  navIconImage: {
    width: 26,
    height: 26,
    tintColor: "#fff",
  },
  profileNavIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
  },
  profileNavImage: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;