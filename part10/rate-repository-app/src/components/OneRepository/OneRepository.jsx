import {ActivityIndicator, StyleSheet, Text, Platform, View, Button } from "react-native";
import RepositoryItems from "../RepositoryItem";
import useOneRepositories from "../../hooks/useOneRepository";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";
import theme from "../../theme";

const OneRepository =()=>{

  const { id } = useParams();

  const { repository, loading, error } = useOneRepositories(id);
  console.log(repository)
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (repository.length === 0) {
    return <Text style={styles.emptyText}>No repositories found</Text>;
  }
  const openInGitHub = () => {
    Linking.openURL(repository.url); // Abre la URL en el navegador
  };
  return(
    <View style={styles.container}>
    <RepositoryItems item={ repository }/>
    <Button
        title="Open in GitHub"
        onPress={openInGitHub}
        style={[styles.OneView, styles.commonTextStyle]}
      />
    </View>
  )
}

const fontStyles = {
  fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
    default: 'System',
  }),
  fontSize: theme.fontSizes.subheading,
};


const styles = StyleSheet.create({
  OneView:{
    padding:theme.paddings.normal,
    backgroundColor:theme.colors.darkPrimary
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  commonTextStyle: {
    ...fontStyles,
  },
  fullName:{
    fontWeight:theme.fontWeights.bold,
    color:theme.colors.textPrimary,
  },
  description:{
    fontWeight:theme.fontWeights.bolder,
    color:theme.colors.textSecondary
  },
  language:{
    color:theme.colors.darkPrimary,
    backgroundColor:theme.colors.primary,
    borderRadius:8,
    paddingVertical:8,
    paddingRight:6,
    textAlign: 'left', 
    alignSelf: 'flex-start',
  },
});

export default OneRepository;