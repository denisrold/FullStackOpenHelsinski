
import { format } from 'date-fns'
import { StyleSheet, Text, View } from "react-native";
import theme from "../../theme";

const ReviewItem = ({ review , myReviews = false }) => {  
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
return(
  <View style={styles.OneView}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={styles.reviewsBox}>
       
        { myReviews?(
        <Text style={[styles.fullName, { marginBottom: 8 }]}>
          {review.repository.ownerName}/{review.repository.name}
        </Text>
        ):
        <Text style={[styles.fullName, { marginBottom: 8 }]}>
          {review.user.username}
        </Text>
        }
        <Text style={[styles.created,{ marginBottom: 8 }]}>
          {formattedDate}
        </Text>
        <Text
          style={[ styles.textFlex]}
          numberOfLines={6}          
          ellipsizeMode="tail" 
        >
          {review.text}
        </Text>
      </View>
    </View>
)
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

export default ReviewItem;