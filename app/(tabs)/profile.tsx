import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const navIcons = [
    { id: "1", name: "home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png", route: "/(tabs)" },
    { id: "2", name: "search", icon: "https://cdn-icons-png.flaticon.com/512/3031/3031293.png", route: "/(tabs)/search" },
    { id: "3", name: "add", icon: "https://cdn-icons-png.flaticon.com/512/1237/1237946.png", route: "" },
    { id: "4", name: "reels", icon: "https://cdn-icons-png.flaticon.com/512/2991/2991195.png", route: "/(tabs)/reels" },
  ];

  const handleNavigation = (route: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
 
      <View style={styles.header}>
        <TouchableOpacity>
       
        </TouchableOpacity>
        <Text style={styles.username}>api_users</Text>
        <TouchableOpacity>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png" }} 
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: "https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t" }} 
              style={styles.avatar}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>890</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

     
        <View style={styles.bioContainer}>
          <Text style={styles.displayName}>API Users</Text>
          <Text style={styles.bio}>
             Developer{'\n'}
             Mobile App Enthusiast{'\n'}
             React Native | TypeScript
          </Text>
        </View>

   
        <View style={styles.actionButtons}>
          
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postsSection}>
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItem}>
              <Image 
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-jQj0yqOlo1zVwYntchJTJL8g55Nq6fb0A&s" }} 
                style={[styles.tabIcon, styles.activeTab]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
              <Image 
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991195.png" }} 
                style={styles.tabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
              <Image 
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png" }} 
                style={styles.tabIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyPosts}>
            <Image 
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/747/747310.png" }} 
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No Posts Yet</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navIcons.map((navIcon) => (
          <TouchableOpacity 
            key={navIcon.id} 
            style={styles.navButton}
            onPress={() => handleNavigation(navIcon.route)}
          >
            <Image 
              source={{ uri: navIcon.icon }} 
              style={styles.navIconImage} 
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push("/(tabs)/profile" as any)}
        >
          <View style={styles.profileNavIcon}>
            <Image 
              source={{ uri: "https://i.pinimg.com/originals/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg?nii=t" }} 
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  lockIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#333',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  postsSection: {
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  activeTab: {

  },
  emptyPosts: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#000',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  navButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconImage: {
    width: 26,
    height: 26,
    tintColor: '#fff',
  },
  profileNavIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0095f6',
  },
  profileNavImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileScreen;