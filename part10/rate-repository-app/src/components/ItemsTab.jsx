import { StyleSheet, Text, View } from "react-native"

const ItemsTab = ({stylesParams,item}) => {
  const parseItem = item
  console.log(parseItem)
  return(<View style={styles.rates}>
              <Text style={stylesParams.fullName}>{item}K</Text>
              <Text style={stylesParams.description}>Stars</Text>
        </View>
  )
}

const styles = StyleSheet.create({
  rates:{
    flexDirection:'column',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    gap:5
  },
})

export default ItemsTab;