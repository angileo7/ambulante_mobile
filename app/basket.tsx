import { View, Text, FlatList,StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import useBasketStore from '../store/basket'
import { useOrderStore } from '../store/order'
import Colors from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link, useLocalSearchParams } from 'expo-router'
import { useAuthFacade } from '../store/auth/useAuthFacade';
import GmailStyleSwipeableRow from '../Components/Swipe'
import { colors } from 'Components/colors';
import StyledTextInput from 'Components/Inputs/StyledTextInput'
const { primary, secondary, tertiary } = colors;

const Basket = () => {
    const {total, clearCart, products, reduceProduct} = useBasketStore()
    const { createOneOrder, updateOneOrder, order, loading } = useOrderStore();
    const { user} = useAuthFacade();
    const [isOrderSet, setIsOrderSet] = useState(false)
    const [nombre, setNombre] = useState('')
    // const params = useLocalSearchParams();
   // const { id  } = params;

   const  handleChange = (event) => {
    setNombre(event);
};

    const checkout = () => {
      if(order?._id)
        updateOneOrder({
          id: order?._id,
          products: products
        })
      else
        createOneOrder({
          products: products, 
        },
        user.current_journey,
        nombre
      )

      setIsOrderSet(true)
      clearCart()
    }

  return (
    <>
      {isOrderSet && (
          <ConfettiCannon count={200} origin={{x: -10, y: 0}} fallSpeed={3000} fadeOut={true} autoStart={true}  />
      )}
      {isOrderSet && (
        <View style={{marginTop:'50%', padding:20,alignItems:'center'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Your Order is Confirmed</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Thank you for your order!</Text>
            <Link href={'/dashboard'} asChild>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnTxt}>Back to Home</Text>
                </TouchableOpacity>
            </Link>
        </View>
      )}
      {!isOrderSet && (
          <>
          <FlatList data={products} 
          ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Added Items: {order?._id}</Text>}
          renderItem={({item}) => (
            <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)} >
              <View style={styles.row}>
                  <Text style={{ fontSize:18}}>{item.quantity} x</Text>
                  <Text style={{ fontSize:18,flex:1, marginHorizontal: 16}}>{item.title}</Text>
                  <Text style={{ fontSize:18}}>$ {item.price}</Text>
              </View>
            </GmailStyleSwipeableRow>
          )}
          ListFooterComponent={
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff'}}>
              <StyledTextInput
                label="Nombre"
                icon="account-circle-outline"
                placeholder="nombre de la persona"
                onChangeText={handleChange}
                //onBlur={handleBlur('password')}
                value={nombre}
                isPassword={false}
                style={{ marginBottom: 25 }}
              />
              </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.medium}}>Subtotal</Text>
                    <Text style={{ fontSize:16, color:Colors.medium}}>$ {total}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.mediumDark, fontWeight: 'bold'}}>Total Order</Text>
                    <Text style={{ fontSize:16, color:Colors.mediumDark,fontWeight: 'bold'}}>$ {(total).toFixed(2)}</Text>
                </View>
            </View>
          }
          />
          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
            { !loading && <TouchableOpacity style={styles.btn} onPress={checkout} >
                    <Text style={styles.btnTxt}>Place Order</Text>
                </TouchableOpacity>
            }
                {loading && (
                  <ActivityIndicator size="small" color={secondary} animating={true}/>
              )}
            </SafeAreaView> 
          </View>
          </>
      )}
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