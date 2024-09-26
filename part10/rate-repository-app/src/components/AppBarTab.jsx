import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.darkPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    margin:theme.margins.normal,
    marginBottom:20
  }
});

const AppBarTab = ({ title,link }) => {
  return (
  <Link to={link}>
    <Text style={styles.text}>{title}</Text>
  </Link>
);
};

export default AppBarTab;