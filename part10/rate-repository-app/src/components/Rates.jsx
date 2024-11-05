import { StyleSheet, View } from "react-native"

const Rates = ({children}) => {
 return(
 <View style={styles.rateProfile}>
  {children}
 </View>) 
}

const styles = StyleSheet.create({
  rateProfile:{

    flexDirection:'row',
  },
})
export default Rates;