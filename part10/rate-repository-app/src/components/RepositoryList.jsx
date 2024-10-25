import { FlatList, View,Text, StyleSheet, ActivityIndicator } from 'react-native';
import RepositoryItems from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Pressable } from 'react-native';



const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({item,handlePress  }) => (<Pressable onPress={() => handlePress(item.id)}><RepositoryItems item={item}/></Pressable>)

export const RepositoryListContainer = ({orderBy, setOrderBy, setOrderDirection, repositories }) => {
  const navigate = useNavigate()

  const handlePress = (id) => {
    navigate(`/repository/${id}`); // Navega a la vista del repositorio único
  };


  const OrderSelector = ({ setOrderBy, setOrderDirection }) => (
    <Picker   
      selectedValue={orderBy}
      onValueChange={(value) => {
        if (value === 'CREATED_AT_ASC' || value === 'CREATED_AT_DESC') {
          setOrderBy('CREATED_AT');
          setOrderDirection(value.endsWith('ASC') ? 'ASC' : 'DESC');
        } else {
          setOrderBy('RATING_AVERAGE');
          setOrderDirection(value.endsWith('ASC') ? 'ASC' : 'DESC');
        }
      }}
      style={{height: 50,background:"#D8D8D8" }}
    >

      <Picker.Item  label="Select filter" value="" />
      <Picker.Item  label="Latest repositories" value="CREATED_AT_DESC" />
      <Picker.Item  label="Best Rating" value="RATING_AVERAGE_DESC" />
      <Picker.Item  label="Wrost Rating" value="RATING_AVERAGE_ASC" />
    </Picker>
    )

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
          <OrderSelector setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
        }
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item  }) => renderItem({ item ,handlePress })}
        keyExtractor={(item)=>item.id}
      />
    );
};

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
