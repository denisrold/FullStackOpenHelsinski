import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';


const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  
  return (
    <View >
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}

        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 10,
    color:theme.colors.error,
    fontWeight:theme.fontWeights.bolder
  },

});
export default FormikTextInput;