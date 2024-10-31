import {  StyleSheet, Platform, Pressable, View, Text } from 'react-native';
import theme from '../../theme';
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

const MyReviews = () => {
  const navigate = useNavigate();

  const handlePress = async ()=>{
    try{  
      navigate('/myreviews')
    }
    catch(error){
      console.error('Error during logout:', error);
    }
  }
  return (
    <View >
      <Pressable onPress={handlePress} ><Text style={styles.text}>My Review</Text></Pressable>
    </View>
);
};


export default MyReviews;