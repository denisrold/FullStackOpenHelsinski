import { StyleSheet, Text,Image, View, Platform } from "react-native"
import theme from "../theme";
import Rates from "./Rates";
import HeaderProfile from "./HeaderProfile";
import ProfileData from "./ProfileData";
import ItemsTabRates from "./ItemsTab";

const fontStyles = {
  fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
    default: theme.fonts.main,
  }),
  fontSize: theme.fontSizes.subheading,
};


const RepositoryItems = ({ item }) => {
  return(
        <View testID={item.id} style={styles.OneView}>
          <HeaderProfile>
            <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}}/>
            <ProfileData>
              <Text style={[styles.fullName ,styles.commonTextStyle, {marginBottom:8}]}>{item.fullName}</Text>
              <Text style={[styles.description,styles.commonTextStyle, {marginBottom:8}]}>{item.description}</Text>
              <Text style={[styles.language, styles.commonTextStyle]}> {item.language}</Text>
            </ProfileData>
          </ HeaderProfile>
          <Rates>
            <ItemsTabRates  stylesParams={styles} title={'Stars'} testID={item.id}  item={item.stargazersCount}/>
            <ItemsTabRates  stylesParams={styles} title={'Forks'} testID={item.id}  item={item.forksCount}/>
            <ItemsTabRates  stylesParams={styles} title={'Reviews'} testID={item.id}  item={item.reviewCount}/>
            <ItemsTabRates  stylesParams={styles} title={'Rating'} testID={item.id}  item={item.ratingAverage}/>
          </Rates>
        </View>
  )
}

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

export default RepositoryItems;