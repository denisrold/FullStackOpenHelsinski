import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import AuthStorage from '../utils/authStorage';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
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

const AuthComponent = () => {
  
  const initialValues ={
    username:'',password:''
  } 
  const [loginError, setLoginError] = useState(null);
  const [login] = useLogin();

  const onLogin = async (values) => {
    try {
      const { username, password } = values;
      const { data } = await login({username, password});
      const authStorage = new AuthStorage();
      authStorage.setAccessToken(data.authenticate.accessToken);
    } catch (error) {
      console.error(error)
      setLoginError('Bad username or password');
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onLogin} validationSchema={validationSchema}>
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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      {loginError && <Text style={styles.error}>{loginError}</Text>}
    </View>)}
    </Formik>
  );
};

const styles = StyleSheet.create({
  error:{
    color:'red',
    flex:'row',
    textAlign:'center',
    fontWeight:theme.fontWeights.bolder
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

export default AuthComponent;