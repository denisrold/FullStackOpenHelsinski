import { ActivityIndicator, StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import RepositoryItems from "../RepositoryItem";
import useOneRepositories from "../../hooks/useOneRepository";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";
import theme from "../../theme";
import useReviews from "../../hooks/useReviews";

import ReviewItem from "./ReviewItem";

const OneRepository = () =>{

  const { id } = useParams();

  const { repository, loading, error } = useOneRepositories(id);
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (!repository) {
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


const SingleRepository = () => {
  const { id } = useParams();
  const { reviews, loading, error, fetchMore, hasNextPage } = useReviews(id);
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (reviews.length === 0) {
    return <Text style={styles.emptyText}>No repositories found</Text>;
  }
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <OneRepository />}
      onEndReached={hasNextPage ? fetchMore : null}
      onEndReachedThreshold={1}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};


const styles = StyleSheet.create({
  OneView:{
  
    flexDirection:'row',
    padding:theme.paddings.normal,
    backgroundColor:theme.colors.darkPrimary,
    flex:1,
  },
  reviewsBox:{
    flex:1,
    paddingLeft: 10,
  },
  textFlex:{
    flexWrap: 'wrap',
    textAlign: 'left',
    flexShrink: 1,   
  },
  rating:{
    display:'flex',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,             
    color:theme.colors.primary,
    borderColor: theme.colors.primary,
    fontWeight: '700',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  fullName:{
    fontWeight:theme.fontWeights.bold,
    color:theme.colors.textPrimary,
  },
  created:{
    color:'gray',
  },
  button: {

    textAlign:'center',
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
  },
  separator: {
    height: 20,
  },
});

export default SingleRepository;