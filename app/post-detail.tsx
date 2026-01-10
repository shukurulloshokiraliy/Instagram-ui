import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
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
} from 'react-native';

const { width } = Dimensions.get('window');

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
  tags?: string[];
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Fetch post details
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });

    // Fetch comments for the post
    fetch(`https://dummyjson.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      });
  }, [id]);

  const defaultPostImage = 'https://i.ytimg.com/vi/_fVFV9wGOf4/maxresdefault.jpg';

  const getUserInfo = () => ({
    username: 'Api-Users',
    avatar:
      'https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t',
  });

  const actionIcons = [
    {
      id: '1',
      name: 'like',
      icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
      filledIcon: 'https://cdn-icons-png.flaticon.com/512/1077/1077086.png',
    },
    {
      id: '2',
      name: 'comment',
      icon: 'https://cdn-icons-png.flaticon.com/512/1380/1380338.png',
    },
    {
      id: '3',
      name: 'share',
      icon: 'https://cdn-icons-png.flaticon.com/512/3024/3024593.png',
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Post not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userInfo = getUserInfo();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <Image source={{ uri: userInfo.avatar }} style={styles.postAvatar} />
            <View>
              <Text style={styles.postUsername}>{userInfo.username}</Text>
              <Text style={styles.audioText}>Original audio</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image source={{ uri: defaultPostImage }} style={styles.postImage} />

        {/* Action Icons */}
        <View style={styles.postActions}>
          <View style={styles.postActionsLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Image
                source={{
                  uri: isLiked ? actionIcons[0].filledIcon : actionIcons[0].icon,
                }}
                style={[styles.actionIconImage, isLiked && styles.likedIcon]}
              />
            </TouchableOpacity>
            {actionIcons.slice(1).map((icon) => (
              <TouchableOpacity key={icon.id} style={styles.actionButton}>
                <Image source={{ uri: icon.icon }} style={styles.actionIconImage} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
            <Image
              source={{
                uri: isSaved
                  ? 'https://cdn-icons-png.flaticon.com/512/5662/5662990.png'
                  : 'https://cdn-icons-png.flaticon.com/512/5662/5662990.png',
              }}
              style={[styles.actionIconImage, isSaved && styles.savedIcon]}
            />
          </TouchableOpacity>
        </View>

        {/* Likes and Views */}
        <View style={styles.statsContainer}>
          <Text style={styles.likes}>
            {(post.reactions.likes + (isLiked ? 1 : 0)).toLocaleString()} likes
          </Text>
          <Text style={styles.views}>{post.views.toLocaleString()} views</Text>
        </View>

        {/* Post Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
        </View>

        {/* Post Body */}
        <View style={styles.bodyContainer}>
          <Text style={styles.captionUsername}>{userInfo.username}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                #{tag}
              </Text>
            ))}
          </View>
        )}

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            Comments ({comments.length})
          </Text>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/150?img=${comment.user.id}`,
                  }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>
                      {comment.user.username}
                    </Text>
                    <Text style={styles.commentTime}>2h</Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.body}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity>
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                    <Text style={styles.commentLikes}>
                      {comment.likes} likes
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.commentLikeButton}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
                    }}
                    style={styles.commentLikeIcon}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.noCommentsContainer}>
              <Text style={styles.noCommentsText}>No comments yet</Text>
              <Text style={styles.noCommentsSubtext}>
                Be the first to comment!
              </Text>
            </View>
          )}
        </View>

        {/* Add Comment Input */}
        <View style={styles.addCommentContainer}>
          <Image source={{ uri: userInfo.avatar }} style={styles.commentInputAvatar} />
          <TouchableOpacity style={styles.commentInput}>
            <Text style={styles.commentInputPlaceholder}>Add a comment...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  postUsername: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  audioText: {
    color: '#999',
    fontSize: 11,
    marginTop: 2,
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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 18,
  },
  actionIconImage: {
    width: 26,
    height: 26,
    tintColor: '#fff',
  },
  likedIcon: {
    tintColor: '#ed4956',
  },
  savedIcon: {
    tintColor: '#ffd700',
  },
  statsContainer: {
    paddingHorizontal: 12,
  },
  likes: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  views: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
  },
  titleContainer: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  postTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  bodyContainer: {
    paddingHorizontal: 12,
    marginTop: 12,
  },
  captionUsername: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  postBody: {
    color: '#fff',
    fontSize: 15,
    marginTop: 6,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  tag: {
    color: '#4a9eff',
    fontSize: 14,
    marginRight: 8,
    marginBottom: 6,
    fontWeight: '500',
  },
  commentsSection: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  commentsTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentUsername: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    color: '#999',
    fontSize: 12,
  },
  commentBody: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentActionText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 16,
  },
  commentLikes: {
    color: '#999',
    fontSize: 12,
  },
  commentLikeButton: {
    padding: 4,
  },
  commentLikeIcon: {
    width: 14,
    height: 14,
    tintColor: '#999',
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noCommentsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noCommentsSubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 6,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 24,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  commentInputPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
});

export default PostDetailScreen;