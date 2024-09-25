
import { StyleSheet, View } from "react-native"
const HeaderProfile = ({children}) => {
  return(
    <View style={styles.headerView}>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  headerView:{
    display: 'flex',
    flexDirection:'row'
},
})
export default HeaderProfile;