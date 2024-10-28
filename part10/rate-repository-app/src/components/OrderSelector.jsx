import { Picker } from '@react-native-picker/picker';
const OrderSelector = ({ orderBy, setOrderBy, setOrderDirection }) => (
  <Picker   
    selectedValue={orderBy}
    onValueChange={(value) => {
      if (value === 'CREATED_AT_ASC' || value === 'CREATED_AT_DESC') {
        setOrderBy('CREATED_AT');
        setOrderDirection(value.endsWith('ASC') ? 'ASC' : 'DESC');
      } else {
        setOrderBy('RATING_AVERAGE');
        setOrderDirection(value.endsWith('ASC') ? 'ASC' : 'DESC');
      }
    }}
    style={{height: 50,borderRadius:6, marginBottom:10,background:"#D8D8D8" }}
  >

    <Picker.Item  label="Select filter" value="" />
    <Picker.Item  label="Latest repositories" value="CREATED_AT_DESC" />
    <Picker.Item  label="Best Rating" value="RATING_AVERAGE_DESC" />
    <Picker.Item  label="Wrost Rating" value="RATING_AVERAGE_ASC" />
  </Picker>
  )

  export default OrderSelector;