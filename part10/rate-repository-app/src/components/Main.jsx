
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Route, Routes } from 'react-router-native';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';


const styles = StyleSheet.create({
  container: {
    backgroundColor:theme.colors.main,
    flexGrow: 1,
    flexShrink: 1,
    
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar >
        <AppBarTab title={'Repositories'} link={'/'}/>
        <AppBarTab title={'SignUp'} link={'signup'}/>
        <AppBarTab title={'Login'} link={'login'}/>
      </AppBar >
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<AuthComponent />} />
      </Routes>
    </View>
  );
};

export default Main;
