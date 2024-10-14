import { StyleSheet, Text, View } from "react-native"
import NumberParser from "../utils/NumberParse";

const ItemsTabRates = ({stylesParams,item,title,testID }) => {
  return(<View testID={`${title}-${testID}`} style={styles.rates}>
              <Text style={[stylesParams.fullName,stylesParams.commonTextStyle]}>{NumberParser(item)}</Text>
              <Text style={[stylesParams.description,stylesParams.commonTextStyle]}>{title}</Text>
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