import { Formik } from "formik";
import { Pressable, Text, View, StyleSheet, } from "react-native";
import FormikTextInput from "./FormikTextInput";
import * as yup from 'yup';
import theme from '../theme';


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
 });

const SignInContainer = ({ onSubmit }) => {
  const initialValues = { username: '', password: '' };

  return (
    <View style={styles.formContainer}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  </View>
  );
};



const styles = StyleSheet.create({
  viewContainer:{
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
    marginTop:50
  },
  error:{
    color:'red',
    flex:'row',
    textAlign:'center',
    fontWeight:theme.fontWeights.bolder
  },
  formContainer:{
    margin:10,
    display:'flex',
  },
  button: {
    display:'flex',
    alignItems:'center',
   
    backgroundColor:theme.colors.primary,
    padding:theme.paddings.normal,
    borderRadius:5,
    margin:theme.margins.normal,
    fontSize:theme.fontSizes.subheading
  },
  buttonText: {
    color:theme.colors.darkPrimary,
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bold
  }
})


export default SignInContainer;