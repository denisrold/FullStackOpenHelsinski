import { Text, ActivityIndicator } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const { repositories, loading, error } = useRepositories({orderBy,orderDirection});

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (repositories.length === 0) {
    return <Text style={styles.emptyText}>No repositories found</Text>;
  }

return <RepositoryListContainer orderBy={orderBy} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} repositories={repositories} />;

};

export default RepositoryList;
