import React, { useContext } from 'react';
import {  StyleSheet, Platform, Pressable, View, Text } from 'react-native';
import theme from '../theme';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useNavigate } from 'react-router-native';


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

const LogoutButton = ({ setuserLoggued }) => {
  const navigate = useNavigate();
  const authStorage = useContext(AuthStorageContext);
  const handlePress = async ()=>{
    try{
      await authStorage.removeAccessToken();
      setuserLoggued(null)
      navigate('/login')
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