import { StyleSheet, Text, View } from "react-native"

const ItemsTabRates = ({stylesParams,item,title}) => {
  const itemParser = ()=>{
    if (item >= 1_000_000_000) {
      return (item / 1_000_000_000).toFixed(1) + 'B';
    } else if (item >= 1_000_000) { 
      return (item / 1_000_000).toFixed(1) + 'M';
    } else if (item >= 1_000) { 
      return (item / 1_000).toFixed(1) + 'K';
    } else {
      return item.toString();
    }
  }
  return(<View style={styles.rates}>
              <Text style={stylesParams.fullName}>{itemParser()}</Text>
              <Text style={stylesParams.description}>{title}</Text>
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

export default ItemsTabRates;