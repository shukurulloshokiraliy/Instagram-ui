import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const imageSize = (width - 3) / 3; 

const SearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const navIcons = [
    { id: "1", name: "home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png", route: "/(tabs)" },
    { id: "2", name: "search", icon: "https://cdn-icons-png.flaticon.com/512/3031/3031293.png", route: "/(tabs)/search" },
    { id: "3", name: "add", icon: "https://cdn-icons-png.flaticon.com/512/1237/1237946.png", route: "" },
    { id: "4", name: "reels", icon: "https://cdn-icons-png.flaticon.com/512/2991/2991195.png", route: "/(tabs)/reels" },
  ];


  const images = Array(18).fill("https://avatars.mds.yandex.net/i?id=979e5364eab9ba1247a6d3ceaa12970a620bca86-5492183-images-thumbs&n=13");

  const handleNavigation = (route: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
     
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3031/3031293.png" }} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Image 
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828778.png" }} 
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageGrid}>
          {images.map((imageUrl, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.imageContainer}
              activeOpacity={0.9}
            >
              <Image 
                source={{ uri: imageUrl }} 
                style={styles.gridImage}
                resizeMode="cover"
              />
          
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

  
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
                navIcon.name === 'search' && styles.activeIcon
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
  content: {
    flex: 1,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
  reelsIconOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  reelsIconSmall: {
    width: 20,
    height: 20,
    tintColor: '#fff',
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
    tintColor: '#fff',
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

export default SearchScreen;