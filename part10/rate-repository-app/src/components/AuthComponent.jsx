import { useState } from 'react';
import useSignIn from '../hooks/useSignIn';
import { StyleSheet, Text, View } from 'react-native';
import SignInContainer from './SignInContainer';

const AuthComponent = ({setuserLoggued}) => {

  const [loginError, setLoginError] = useState(null);
  const [login] = useSignIn();

  const onLogin = async (values) => {
    try {
      const { username, password } = values;
      const {data} = await login({username, password});
      setuserLoggued(data);
    } catch (error) {
      console.error(error)
      setLoginError('Bad username or password');
    }
  };
  return (
    <View style={styles.viewContainer}>
      <SignInContainer onSubmit={onLogin} />
      {loginError && <Text style={styles.error}>{loginError}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default AuthComponent;