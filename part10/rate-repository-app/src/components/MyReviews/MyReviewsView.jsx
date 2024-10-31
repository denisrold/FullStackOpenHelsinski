import { useQuery } from "@apollo/react-hooks";
import ReviewItem from "../OneRepository/ReviewItem";
import { GET_CURRENT_USER } from "../../graphQL/queries";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../../theme";

const MyReviewsView = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;
  const reviews = user.reviews ? user.reviews.edges.map(edge => edge.node) : [];
  console.log('user',reviews);
 
  return (
    <FlatList
      data={reviews} 
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id} 
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  
  )
}

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

export default MyReviewsView;