import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const ReelsScreen = () => {
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
        <Text style={styles.headerTitle}>Reels</Text>
        <TouchableOpacity>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/747/747310.png" }} 
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

  
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991195.png" }} 
            style={styles.reelsIcon}
          />
        </View>
        <Text style={styles.title}>Reels</Text>
    
      </View>

  
      <View style={styles.bottomNav}>
        {navIcons.map((navIcon) => (
          <TouchableOpacity 
            key={navIcon.id} 
            style={styles.navButton}
            onPress={() => handleNavigation(navIcon.route)}
          >
            <Image 
              source={{ uri: navIcon.icon }} 
              style={[
                styles.navIconImage,
                navIcon.name === 'reels' && styles.activeIcon
              ]} 
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  reelsIcon: {
    width: 60,
    height: 60,
    tintColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
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
  activeIcon: {
    tintColor: '#0095f6',
  },
  profileNavIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileNavImage: {
    width: '100%',
    height: '100%',
  },
});

export default ReelsScreen;