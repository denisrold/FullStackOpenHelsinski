import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

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
      <Pressable onPress={() => alert('Pressed!')}>
        <View style={styles.container}>{children}</View>
      </Pressable>
      )
};

export default AppBar;