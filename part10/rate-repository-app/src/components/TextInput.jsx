import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';


const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input , style];
  
  return <NativeTextInput style={textInputStyle} {...props} />;
};

const styles = StyleSheet.create({
  input:{
    padding:theme.paddings.normal,
    borderWidth:2,
    borderColor:'transparent',
    borderRadius:5,
    margin:theme.margins.normal,
    fontSize:theme.fontSizes.subheading,
    placeholderTextColor:'#a3a8b7',
    backgroundColor:theme.colors.darkPrimary
  }
});
export default TextInput;