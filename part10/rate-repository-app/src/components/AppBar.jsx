import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor:theme.colors.textPrimary,
  },
});

const AppBar = ({children}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {children}
      </ScrollView>
    </View>)
};

export default AppBar;