import {ActivityIndicator, StyleSheet, Text, Platform, View, Button, Pressable, FlatList } from "react-native";
import RepositoryItems from "../RepositoryItem";
import useOneRepositories from "../../hooks/useOneRepository";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";
import theme from "../../theme";
import useReviews from "../../hooks/useReviews";
import { format } from 'date-fns'

const OneRepository =()=>{

  const { id } = useParams();

  const { repository, loading, error } = useOneRepositories(id);
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

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
return(
  <View style={styles.OneView}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={styles.reviewsBox}>
        <Text style={[styles.fullName, { marginBottom: 8 }]}>
          {review.user.username}
        </Text>
        <Text style={[styles.created,{ marginBottom: 8 }]}>
          {formattedDate}
        </Text>
        <Text
          style={[ styles.textFlex]}
          numberOfLines={6}          // Limita a 4 líneas el texto, si necesitas más, ajusta este valor
          ellipsizeMode="tail"       // Agrega "..." si se corta el texto
        >
          {review.text}
        </Text>
      </View>
    </View>
)
};

const SingleRepository = () => {
  const { id } = useParams();
  const { reviews, loading, error } = useReviews(id);

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
      data={reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <OneRepository />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};


const styles = StyleSheet.create({
  OneView:{
    display: 'flex',
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
  },
  separator: {
    height: 20,
  },
});

export default SingleRepository;