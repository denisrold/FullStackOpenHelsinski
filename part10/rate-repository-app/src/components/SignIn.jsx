import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
 username: yup
   .string()
   .required('Username is required'),
 password: yup
   .string()
   .required('Password is required'),
});

const SignIn = () => {
  const initialValues ={
    username:'',password:''
  } 
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name="username"
            placeholder="Username"
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.button}>
            <Pressable  onPress={handleSubmit} >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

          </View>
        </View>
      )}
    </Formik>
  )
};

const styles = StyleSheet.create({
  formContainer:{
    margin:10
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
export default SignIn;