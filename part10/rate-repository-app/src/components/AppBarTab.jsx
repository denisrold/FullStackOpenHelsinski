import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.darkPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBarTab = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default AppBarTab;