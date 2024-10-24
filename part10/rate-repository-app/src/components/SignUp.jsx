import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from 'yup';
import useSignUp from "../hooks/useSignUp";

const validationSchema = yup.object().shape({
 username: yup
   .string().min(3,'The username must be at least 3').max(30,'The username cannot exceed 30')
   .required('Username is required'),
 password: yup
   .string().min(3,'The password must be at least 5').max(30,'The password cannot exceed 50')
   .required('Password is required'),
   confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const initialValues ={
    username:'',password:'',confirmPassword:''
  } 
  const onSubmit = async (values) => {
    const { username, password } = values;
    try{
       await signUp({username,password})
    }catch(err){
      throw new Error(err.message);
    }
  };
  return (
    <View style={styles.viewContainer}>
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
             <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
          />
          <View style={styles.button}>
            <Pressable  onPress={handleSubmit} >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
    </View>
  )
};

const styles = StyleSheet.create({
  viewContainer:{
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
    marginTop:50
  },
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
export default SignUp;