import { View, Text, ScrollView,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { restaurants } from '../assets/data/home'
import { Link } from 'expo-router'
import Colors from '../constants/Colors'
import { Product } from 'types/product/types'

const Restaurants = ({ categories = [], setProductsCategorized }) => {
    const onPressHandler = (category: string, products: Product[]) => {
        setProductsCategorized(category, products)
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal:16
    }}
    >
      {categories.map((item: {name: string, productsCategorized: Product[]}, index) => ( //category tyoe
            <Link href={'/details'} asChild key={index} onPress={() => onPressHandler(item.name, item.productsCategorized)}>
                <TouchableOpacity>
                    <View style={styles.card}>
                        <Image source={item.img} style={styles.img} />
                            <View style={styles.restBox}>
                                <Text style={styles.cardTxt}>{item.name}</Text>
                            </View>
                    </View>
                </TouchableOpacity>
            </Link>

      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    card:{
        width:300,
        height:250,
        backgroundColor:'#fff',
        marginEnd:10,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        marginBottom:10,
        borderRadius:4,
        marginStart:5
    },
    cardTxt:{
        paddingVertical:10,
        fontSize:12,
        fontWeight:'bold',
       
    },
    imgContainer:{

    },
    img:{
        flex:5,
        width:undefined
    },
    restBox:{
        flex:2,
        padding:10,

    }
})

export default Restaurants