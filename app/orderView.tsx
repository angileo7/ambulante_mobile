import { View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useBasketStore from '../store/basket'
import { useOrderStore } from '../store/order'
import Colors from '../constants/Colors'
import {  useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import GmailStyleSwipeableRow from '../Components/Swipe'

const Basket = () => {
    const navigation = useNavigation()
    const { order } = useOrderStore();
    const { clearCart, products, reduceProduct, addProduct } = useBasketStore()

    useEffect(()=>{
      clearCart();
      order &&
      order.products.forEach((product) => {
        for(var i=0; i<product.quantity; i++)
          addProduct(product);
      }); 
    },[order])

    const moveTo = (screen, payload) => {
      navigation.navigate(screen, { ...payload });
    };

    const cancelEditing = () => {
        clearCart();
        moveTo('dashboard');
    }

  return (
    <>
          <FlatList data={products} 
          ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}></Text>}
          renderItem={({item}) => (
            <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)} >
              <View style={styles.row}>
                  <Text style={{ fontSize:18}}>{item.quantity} x</Text>
                  <Text style={{ fontSize:18,flex:1, marginHorizontal: 16}}>{item.title}</Text>
                  <Text style={{ fontSize:18}}>$ {item.price}</Text>
              </View>
            </GmailStyleSwipeableRow>
          )}
          />

          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
                <TouchableOpacity style={styles.btn} onPress={() => {moveTo('dashboard', {id: order?._id})}}  >
                    <Text style={styles.btnTxt}>Agregar mas</Text>
                </TouchableOpacity>
            </SafeAreaView> 
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
                <TouchableOpacity style={styles.btn} onPress={() => {moveTo('basket', {id: order?._id})}}>
                    <Text style={styles.btnTxt}>Ver carrito</Text>
                </TouchableOpacity>
            </SafeAreaView> 
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
                <TouchableOpacity style={styles.btnCancel} onPress={() => {cancelEditing()}} >
                    <Text style={styles.btnTxt}>Cancelar Edicion</Text>
                </TouchableOpacity>
            </SafeAreaView> 
          </View>
          </>
  )
}

const styles = StyleSheet.create({
    btnTxt:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
    
    gap:20
},
    btn:{ 
        backgroundColor: Colors.primary,
       paddingHorizontal: 16,
       borderRadius: 8,
       alignItems: 'center',
       justifyContent: 'space-between',
       marginBottom: 16,
       marginTop: 16,
       width: '100%',
       flexDirection: 'row',
       height: 50
     },
     btnCancel:{ 
      backgroundColor: Colors.tertiary,
     paddingHorizontal: 2,
     borderRadius: 8,
     alignItems: 'center',
     justifyContent: 'space-between',
     marginBottom: 16,
     marginTop: 16,
     width: '100%',
     flexDirection: 'row',
     height: 50
   },
    footer:{
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        width: '100%',
        elevation:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -20,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  }
})

export default Basket