import { Text, ActivityIndicator } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeywords] = useState('');
  const { repositories, loading, error, fetchMore, hasNextPage } = useRepositories({orderBy,orderDirection,searchKeyword,first: 2});

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (repositories.length === 0) {
    return <Text style={styles.emptyText}>No repositories found</Text>;
  }
  console.log(repositories)
  const onEndReach = () => {
    if(hasNextPage){
      fetchMore(); // Se ejecuta para cargar más repositorios
    }
  }
return <RepositoryListContainer onEndReach={onEndReach} searchKeyword={searchKeyword} setSearchKeywords={setSearchKeywords} orderBy={orderBy} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} repositories={repositories} />;

};

export default RepositoryList;
