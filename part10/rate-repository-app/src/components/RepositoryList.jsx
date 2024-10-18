import { FlatList, View,Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import RepositoryItems from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({item,handlePress  }) => (<TouchableOpacity onPress={() => handlePress(item.id)}><RepositoryItems item={item}/></TouchableOpacity>)

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()

  const handlePress = (id) => {
    navigate(`/repository/${id}`); // Navega a la vista del repositorio único
  };
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    if (!repositories) {
      return <Text style={styles.emptyText}>Loading repositories...</Text>;
    }
  
    if (repositoryNodes.length === 0) {
      return <Text style={styles.emptyText}>No repositories found</Text>;
    }
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item  }) => renderItem({ item ,handlePress })}
        keyExtractor={(item)=>item.id}
      />
    );
};

const RepositoryList = () => {



  const { repositories, loading, error } = useRepositories();
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  }
  if (repositories.length === 0) {
    return <Text style={styles.emptyText}>No repositories found</Text>;
  }
return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
