import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { Product } from '../../types/product/types'
import { MaterialIcons } from '@expo/vector-icons';

const OrderItem = (props) => {
    const getDescription = (products: Product[]): string => {
        const counts = {};
        products.forEach(function (product: Product) { counts[product.title] = (counts[product.title] || 0) + 1 })
        return Object.keys(counts).map(key => `${counts[key]} ${key}`).join(", ");
    };

    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
                <Text style={styles.index}>{props.index}</Text>
            </View>
            <View style={styles.taskContainer}>
                <Text>{getDescription(props.order.products)}</Text>
                <TouchableOpacity onPress={() => props.deleteTask()}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      marginHorizontal: 20,
  },
  indexContainer: {
      backgroundColor: '#3E3364',
      borderRadius: 12,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
  },
  index: {
      color: '#fff',
      fontSize: 20,
  },
  taskContainer: {
      backgroundColor: '#3E3364',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 5,
      paddingVertical: 5,
      minHeight: 50,
  },
  task: {
    color: '#fff',
    width: '90%',
    fontSize: 10,
},
});

export default OrderItem;