import { View, Text,StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem, ScrollViewComponent, ScrollView } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import ParallaxScrollView from '../Components/Parallax'
import Colors from '../constants/Colors'
import { Link, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useBasketStore from '../store/basket'
import { useProductStore } from 'store/product';
import { MEALS }from '../assets/images/ImageCollection'
import { CATEGORIES }from '../assets/images/ImageCollection'
import { useRoute } from '@react-navigation/native'
import { useAuthFacade } from '../store/auth/useAuthFacade';

const Details = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const { user} = useAuthFacade();
    const { name } = route.params;
    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const onScroll = (event: any) => {
        const yOffset = event.nativeEvent.contentOffset.y
        if(yOffset >370){
            opacity.value = withTiming(1)
        } else {
            opacity.value = withTiming(0)
        }
    }

    const {items, total} = useBasketStore();
    const {productsCategorized} = useProductStore();

    const DATA= [productsCategorized].map((item,index)=>({
            title: item.category,
            data: item.meals,
            index
    }))

    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<TouchableOpacity[]>([])

    const renderItem: ListRenderItem<any> = ({item, index}) => {
      if(item.store == user?._id) return(
      <Link href={{ pathname: '(modal)/dish', params: { id: item._id } }}  asChild>
        <TouchableOpacity style={styles.card}>
          <View style={{flex:1}}>
            <Text style={styles.cardTxt}>{item.title}</Text>
            <Text style={styles.cardInfo}>{item.description}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
            <Image source={MEALS[item.img.split('.')[0]]?.img} style={styles.img} />
           
        </TouchableOpacity>
      </Link>
    )
  else
  return null
}

    useLayoutEffect(() => {
      navigation.setOptions({
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.primary,
          headerLeft: () => (
        <TouchableOpacity style={styles.topBtn}  onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>
          ),
          headerRight: () => (
          <View style={styles.bar}>
        <TouchableOpacity style={styles.topBtn}  >
            <Ionicons name="share-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topBtn}  >
            <Ionicons name="search-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>
          </View>
          )
      })  
    },[])

    const selectedCategory= (index:number) => {
      const selected = itemsRef.current[index]

        setActiveIndex(index)

        selected.measure((x,) => {
            scrollRef.current?.scrollTo({x: x - 16, y: 0, animated: true})
        })
    }
    
  return (
    <>
      <ParallaxScrollView 
      scrollEvent={onScroll}
      style={{ flex: 1 }}
      backgroundColor={'#fff'}
       renderBackground={() => (
          <Image style={{width: '100%', height: 250}} source={CATEGORIES[name]?.img} />
      )} 
      parallaxHeaderHeight={250}
      stickyHeaderHeight={120}
      contentBackgroundColor={Colors.lightGrey}
      renderStickyHeader={() => <View key='sticky-header' style={styles.headerStick}>
        <Text style={styles.stickyText}>{productsCategorized.category}</Text>
      </View>}>
        <View style={styles.detailContainer}>
        <Text style={styles.restName}>{productsCategorized.category}</Text>
        <Text style={styles.restAbout}>{productsCategorized.description}</Text>
        <View style={{flexDirection: 'row',flex:1}}>
        <Image style={styles.bike} source={require('../assets/images/applebike.png')} /> 
        </View>
        
        <SectionList contentContainerStyle={{paddingBottom: 50}} keyExtractor={(item,index)=> `${index + item._id}`} scrollEnabled={false} sections={DATA} renderItem={renderItem}
        
        ItemSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey,marginHorizontal: 20}}/>}
        SectionSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey}}/>}
        renderSectionHeader={({section:{title,index}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        />
        </View>
      </ParallaxScrollView>

      {/* Basket */}

      {items > 0 && (
        <View style={styles.basket}>
          <View style={styles.footerContainer}>
            <Link href={'/basket'} asChild>
              <TouchableOpacity style={styles.btn}>
            <Text style={styles.basketItem}>{items}</Text>
            <Text style={styles.basketText}>View Cart</Text>
            <Text style={styles.basketTotal}> ${total}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  basketItem:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#19AA86',
    padding: 6,
    borderRadius: 20,
  },
basketText:{
  fontWeight: 'bold',
  fontSize: 16,
  color: '#fff',
},
basketTotal:{
  fontWeight: 'bold',
  fontSize: 16,
  color: '#fff',
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
  footerContainer:{flexDirection: 'row',justifyContent: 'center',gap: 10},
  basket:{
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
  stickySlider:{
    position: 'absolute',
 
    height: 50,
    left:0,
    right:0,
    top:100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4
  },
  sliderShadow:{
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    width: '100%',
    height:'100%'
  },
  sliderBtnTxtActive:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16
  },
  sliderBtnActive:{
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50
  },
  sliderBtn:{
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50
  },
  sliderBtnTxt:{
    
    color: Colors.primary,
    fontSize: 16
  },
  bike:{
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 16
  },
  
  cardInfo:{
    fontSize: 14,
    color: Colors.medium,
  },
cardPrice:{
  paddingVertical: 4
},
  cardTxt:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4
  },
  img:{
    height:80,
    width: 80,
    borderRadius: 8,
    marginLeft: 16
  },
  card:{
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
   sectionHeader:{
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16
   },
   restDish:{
     
   },
   
    detailContainer:{
        backgroundColor: Colors.lightGrey,

    },
    headerStick:{
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',


    },
    topBtn:{
        width:40,
        height:40,
        borderRadius:25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    stickyText:{
        fontSize: 20,
        margin: 10,
    },
    restName:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16
    },
    restTag:{
      fontSize: 16,
        marginTop:3,
        margin: 6,
        lineHeight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: Colors.mediumDark
    },
    restTags:{
        fontSize: 16,
        marginTop:6,
        margin: 16,
        lineHeight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: Colors.medium
    },
    restAbout:{
       fontSize: 16,
       marginTop:6,
        margin: 16,
        lineHeight: 25,
        color: Colors.mediumDark
    }

})

export default Details