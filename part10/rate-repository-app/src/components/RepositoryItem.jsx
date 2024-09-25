import { StyleSheet, Text,Image, View } from "react-native"
import theme from "../theme";
import ItemsTab from "./ItemsTab";
import Rates from "./Rates";
import HeaderProfile from "./HeaderProfile";
import ProfileData from "./ProfileData";

const RepositoryItems = ({ item }) => {
  console.log(item)
  return(
        <View style={styles.OneView}>
          <HeaderProfile>
            <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}}/>
            <ProfileData>
              <Text style={[styles.fullName , {marginBottom:8}]}>{item.fullName}</Text>
              <Text style={[styles.description, {marginBottom:8}]}>{item.description}</Text>
              <Text style={styles.language}> {item.language}</Text>
            </ProfileData>
          </ HeaderProfile>
          <Rates>
            <ItemsTab stylesParams={styles} item={item.stargazersCount}/>
            <ItemsTab stylesParams={styles} item={item.forksCount}/>
            <ItemsTab stylesParams={styles} item={item.reviewCount}/>
            <ItemsTab stylesParams={styles} item={item.ratingAverage}/>
          </Rates>
        </View>
  )
}

const styles = StyleSheet.create({
  OneView:{
    border:'solid 1px black',
    padding:theme.paddings.normal
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  fullName:{
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bold,
    color:theme.colors.textPrimary,
  },
  description:{
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bolder,
    color:theme.colors.textSecondary
  },
  language:{
    fontSize:theme.fontSizes.subheading,
    color:theme.colors.darkPrimary,
    backgroundColor:theme.colors.primary,
    borderRadius:8,
    paddingVertical:8,
    paddingRight:6,
    textAlign: 'left', 
    alignSelf: 'flex-start',
  },
});

export default RepositoryItems;