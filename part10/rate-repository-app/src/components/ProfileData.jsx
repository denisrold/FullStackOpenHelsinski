
import { StyleSheet, View } from "react-native"

const ProfileData = ({ children })=>{
  return(
    <View style={styles.profileData}>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  profileData:{

    flexDirection:'column',
    paddingLeft:20,
  },
})
export default ProfileData;