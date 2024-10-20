import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import Restaurants from '../Components/Restaurants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import PressableText from '../Components/Texts/PressableText'
import { useProductStore } from 'store/product';

const Page = () => {
  const navigation = useNavigation()
  const {
    categories,
    loadProducts,
    setProductsCategorized
  } = useProductStore();

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Products</Text>
        <Restaurants categories={categories} setProductsCategorized={setProductsCategorized}/>

        <PressableText onPress={() => {moveTo('order')}}>ORDERS</PressableText>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:5,
    marginBottom:20,
    paddingHorizontal:16
  },
  container:{
    top:60,
    backgroundColor: Colors.lightGrey,

  }
})

export default Page
