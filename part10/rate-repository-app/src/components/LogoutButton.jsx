import React, { useContext } from 'react';
import {  StyleSheet, Platform, Pressable, View, Text } from 'react-native';
import theme from '../theme';
import AuthStorageContext from '../contexts/AuthStorageContext';


const styles = StyleSheet.create({
  text: {
    color: theme.colors.darkPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    margin:theme.margins.normal,
    marginBottom:20,
    fontFamily:Platform.select({
      ios: 'Arial', 
      android: 'Roboto',
      default: theme.fonts.main,
    }),
  },
});

//corregir para que logueout
const LogoutButton = ({ setData,refetch }) => {
  const authStorage = useContext(AuthStorageContext);
  const handlePress = async ()=>{
    try{
      await authStorage.removeAccessToken();
      setData(null)
      refetch()
      console.log('Logged out successfully');
    }
    catch(error){
      console.error('Error during logout:', error);
    }
  }
  return (
    <View >
      <Pressable onPress={handlePress} ><Text style={styles.text}>Logout</Text></Pressable>
    </View>
);
};

export default LogoutButton;