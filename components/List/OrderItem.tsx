import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, } from "react-native";
import { Product } from '../../types/product/types'
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { colors } from 'Components/colors';
const { primary, secondary, tertiary } = colors;

const OrderItem = (props) => {
    const getDescription = (products: Product[]): string => {
        let content = '';
       // const counts = {};
        // products.forEach(function (product: Product) { counts[product.title] = (counts[product.title] || 0) + 1 })
        // return Object.keys(counts).map(key => `${counts[key]} ${key}`).join(", ");
        products.forEach(function (product: Product) { content = content + `${product.quantity} ${product.title}, `})
        return content;
    };

    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
                <Text style={styles.index}>{props.order.owner_name}</Text>
            </View>
            {props.loading && (
                  <ActivityIndicator size="large" color={secondary} animating={true}/>
              )}
            {!props.loading && (
                <View style={styles.taskContainer}>
            {/* <Link href={'/basket'} asChild> 
            <Link href={{ pathname: '/basket', params: { id: props.order._id } }} asChild>*/}
              
                  <TouchableOpacity style={styles.btn} onPress={props.loadOneOrder}>
                  <Text>{getDescription(props.order.products)}</Text>
                  </TouchableOpacity>
              
{/*             </Link> */}

                {/* <TouchableOpacity onPress={() => props.deleteTask()}> */}
                <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                            {text: 'No', onPress:() => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress:() => { props.deleteTask()}},
                            ],
                            { cancelable: true}
                        )
                    }}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
            </View>
            )}
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