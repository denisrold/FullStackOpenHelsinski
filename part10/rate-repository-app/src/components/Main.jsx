
import  { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Route, Routes } from 'react-router-native';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import useLoggedUser from '../hooks/useLoggedUser';
import LogoutButton from './LogoutButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor:theme.colors.main,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [userLoggued, setuserLoggued] = useState(null);
  const { data } = useLoggedUser();

  useEffect(() => {
    if (data) {
      setuserLoggued(data);
    } else {
      setuserLoggued(null);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <AppBar >
        <AppBarTab title={'Repositories'} link={'/'}/>
        {!userLoggued && <AppBarTab title={'SignUp'} link={'signup'}/>}
        {!userLoggued && <AppBarTab title={'Login'} link={'login'}/>}
        {userLoggued && <LogoutButton setuserLoggued={setuserLoggued} />}
      </AppBar >
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<AuthComponent setuserLoggued={setuserLoggued}/>} />
      </Routes>
    </View>
  );
};

export default Main;
