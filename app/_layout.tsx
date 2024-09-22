
import {  Stack, useNavigation } from 'expo-router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};



export default function RootLayoutNav() {
 const navigation = useNavigation()

  return (
    <BottomSheetModalProvider>
      <Stack>
      <Stack.Screen name="index" options={{
           header: () => null
         }} />
      <Stack.Screen name="dashboard" options={{
           header: () => null
         }} />
      <Stack.Screen name="(modal)/dish" options={{
          presentation: 'modal',
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: '#fff', padding: 6, borderRadius: 20 }}>
                <Ionicons name="close-outline"  size={30} color={Colors.primary} />
            </TouchableOpacity>
          )
         }} />
         <Stack.Screen name="basket" options={{
            headerTitle: 'Cart',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back"  size={30} color={Colors.primary} />
              </TouchableOpacity>
            )
         }} />
          <Stack.Screen name="order" options={{
            headerTitle: 'Orders',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back"  size={30} color={Colors.primary} />
              </TouchableOpacity>
            )
         }} />
      </Stack>
    </BottomSheetModalProvider>
  );
}
