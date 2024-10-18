import {ActivityIndicator, StyleSheet, Text, Platform, View, Button, Pressable } from "react-native";
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
    <Pressable
        onPress={openInGitHub}
        style={styles.button}
      >
      <Text style={styles.buttonText}>
        Open in GitHub</Text>
    </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    display:'flex',
    alignItems:'center',
   
    backgroundColor:theme.colors.primary,
    padding:theme.paddings.normal,
    borderRadius:5,
    margin:theme.margins.normal,
    fontSize:theme.fontSizes.subheading,
   
  },
  buttonText: {
    color:theme.colors.darkPrimary,
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bold
  }
});

export default OneRepository;