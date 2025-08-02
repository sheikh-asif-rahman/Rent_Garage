import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const cars = [
  {
    id: '1',
    name: 'Toyota Prius',
    status: 'Active',
    image: require('../../../assets/car1.jpg'),
  },
  {
    id: '2',
    name: 'Honda Civic',
    status: 'Inactive',
    image: require('../../../assets/car2.jpg'),
  },
];

const DashboardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  // Auto nudge scroll to hint swiping
  useEffect(() => {
    if (cars.length > 1 && currentIndex === 0) {
      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: screenWidth * 0.15, animated: true });
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 400); // brief pause then return
      }, 3000); // 10 seconds delay

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const renderCarItem = ({ item }) => {
    const isActive = item.status === 'Active';

    return (
      <TouchableOpacity style={styles.carCard}>
        <ImageBackground source={item.image} style={styles.carImage} imageStyle={styles.carImageStyle}>
          <View style={styles.overlay} />
          <View style={styles.cardContent}>
            <Text style={styles.carName}>{item.name}</Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: isActive ? 'green' : 'red' },
                ]}
              />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 1st Row: Current Location */}
      <View style={styles.locationRow}>
        <Text style={styles.locationText}>📍 Dhaka, Bangladesh</Text>
      </View>

      {/* 2nd Row: Car Slider */}
      <View style={styles.topSection}>
        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          ref={flatListRef}
        />
      </View>

      {/* Remaining Content */}
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>More Info</Text>
        <Text>This area takes the remaining 2/3 of the screen.</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#eaf0ff',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  topSection: {
    height: screenHeight / 3.5,
    position: 'relative',
  },
  carCard: {
    width: screenWidth,
    height: '100%',
  },
  carImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  carImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  carName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
});

export default DashboardScreen;
