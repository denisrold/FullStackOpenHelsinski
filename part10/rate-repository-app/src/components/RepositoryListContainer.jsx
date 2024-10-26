import { useNavigate } from 'react-router-native';
import RepositoryItems from './RepositoryItem';
import { Pressable } from 'react-native';
import OrderSelector from './OrderSelector';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  emptyText:{
    fontSize: 20,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({item,handlePress  }) => (<Pressable onPress={() => handlePress(item.id)}><RepositoryItems item={item}/></Pressable>)

 const RepositoryListContainer = ({orderBy, setOrderBy, setOrderDirection, repositories }) => {
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
        ListHeaderComponent={
          <OrderSelector orderBy={orderBy} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
        }
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item  }) => renderItem({ item ,handlePress })}
        keyExtractor={(item)=>item.id}
      />
    );
};

export default RepositoryListContainer;