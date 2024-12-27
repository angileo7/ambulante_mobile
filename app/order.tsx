import React, {useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import OrderItem from '../Components/List/OrderItem'
import { useOrderStore } from 'store/order';
import useBasketStore from '../store/basket'
import {  useNavigation } from 'expo-router';

const Page = () => {
  const navigation = useNavigation();
  const { orders, loadOrders, deleteOneOrder, loadOneOrder, loading } = useOrderStore();
  const { clearCart } = useBasketStore();

  useEffect(() => {
    loadOrders();
  }, []);

  const deleteTask = (deleteIndex: string) => {
    deleteOneOrder(deleteIndex)
  }

  const getOneOrder = async (index: string) => {
    clearCart();
    loadOneOrder(index);    // TODO: populate products after response is received here
    navigation.navigate('orderView');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders</Text>
      <ScrollView style={styles.scrollView}>
        {
        orders.map((order, index) => {
          
          return order.status != 'completed' ?  (
            
            <View key={index} style={styles.taskContainer}>
              <OrderItem loading={loading} index={index + 1} order={order} deleteTask={() => deleteTask(order._id)} loadOneOrder={() => getOneOrder(order._id)}/>
            </View>
          ) : null;
          })
        }
      </ScrollView>
      
                 
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});

export default Page