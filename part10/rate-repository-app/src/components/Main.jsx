
import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState(null);
  const { data: userData, refetch} = useLoggedUser();

  useEffect(() => {
    if (userData) {
      setData(userData);
    } else {
      setData(null);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <AppBar >
        <AppBarTab title={'Repositories'} link={'/'}/>
        {!data && <AppBarTab title={'SignUp'} link={'signup'}/>}
        {!data && <AppBarTab title={'Login'} link={'login'}/>}
        {data && <LogoutButton setData={setData} refetch={refetch}/>}
      </AppBar >
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<AuthComponent setData={setData}/>} />
      </Routes>
    </View>
  );
};

export default Main;
