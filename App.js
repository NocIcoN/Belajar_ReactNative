import React, { useState } from 'react';

import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LazadaLogo from './assets/lazada.png';

const products = [
  { id: '1', name: 'Kerudung', price: 22.499, imageUrl: 'https://lzd-img-global.slatic.net/g/p/a60cb7c35ebd59dfab5ec96647602d84.jpg_200x200q80.jpg_.webp' },
  { id: '2', name: 'Kaos', price: 23.799, imageUrl: 'https://lzd-img-global.slatic.net/g/p/3b87815b5a7189bd9be5ca3b22a20321.jpg_200x200q80.jpg_.webp' },
  { id: '3', name: 'Sandal Slop', price: 39.99, imageUrl: 'https://lzd-img-global.slatic.net/g/ff/kf/S58a201102af74eaea230deecf9a022e9X.jpg_200x200q80.jpg_.webp' },
  
  // Tambahkan URL gambar untuk produk lainnya
];

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  productImage: {
    width: 150,
    height: 150,
  },
});

function ProductList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text>Rp. {item.price}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

function ProductDetail({ route }) {
  const { product } = route.params;
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    setCartItems([...cartItems, product]);
    console.log('Product added to cart');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text>{product.name}</Text>
      <Text>Rp. {product.price}</Text>
      <Button title="Add to Cart" onPress={() => console.log('Product added to cart')} />
    </View>
  );
}

function ShoppingCart({ cartItems }) {
  return (
    <View style={styles.container}>
      <Text>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

function UserLogin() {
  return (
    <View style={styles.container}>
      <Text>User Login</Text>
      {/* Tampilkan formulir login atau registrasi */}
    </View>
  );
}

function UserProfile() {
  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      {/* Tampilkan informasi pengguna dan riwayat pesanan */}
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{
            headerTitle: ' ', // Judul navigasi
            headerTitleAlign: 'left', // Penempatan judul ke kiri
            headerTitleStyle: { // Gaya judul
              fontWeight: 'bold',
              fontSize: 24,
              marginLeft: 10, // Jarak antara judul dan logo
            },
            headerLeft: () => ( // Komponen logo
            <Image source={LazadaLogo} />
            ),
          }}
        />
        {/* Tambahkan rute lainnya */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
