import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { TouchableWithoutFeedback } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    gap:10,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:theme.colors.textPrimary,
    paddingBottom:theme.paddings.normal
  },
});

const AppBar = ({children}) => {
  return (
      <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
      )
};

export default AppBar;