import { useNavigate } from 'react-router-native';
import RepositoryItems from './RepositoryItem';
import { Pressable,  } from 'react-native';
import { TextInput } from 'react-native-paper';
import OrderSelector from './OrderSelector';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';
import { useEffect, useRef } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flatListStyle:{
    padding:5,
  },
    searchInput: {
    display:'flex',
    alignContent:'center',

    borderColor: 'gray', 
    borderWidth: 1, 
    backgroundColor: "#fff",
    marginBottom: 10,   
    shadowColor: '#000', 

    shadowOpacity: 0.25, 
    shadowRadius: 3.5, 
  },
    emptyText: { textAlign: 'center', margin: 20, fontSize: 16 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({item,handlePress  }) => (<Pressable onPress={() => handlePress(item.id)}><RepositoryItems item={item}/></Pressable>)

 const RepositoryListContainer = ({ onEndReach ,searchKeyword , setSearchKeywords , orderBy, setOrderBy, setOrderDirection, repositories }) => {
 const navigate = useNavigate()
 const [debouncedSearchInput] = useDebounce(searchKeyword, 500);  
 const inputRef = useRef(null); // Crear referencia
 const handlePress = (id) => {
  navigate(`/repository/${id}`); // Navega a la vista del repositorio único
 };

 useEffect(() => {
  setSearchKeywords(debouncedSearchInput);
}, [debouncedSearchInput,setSearchKeywords]);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus(); // Mantener el enfoque
  }
}, [repositories]);
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    if (!repositories) {
      return <Text style={styles.emptyText}>Loading repositories...</Text>;
    }
  
    if (repositoryNodes.length === 0 && searchKeyword.length === 0) {
      return <Text style={styles.emptyText}>No repositories found</Text>;
    }
    return (
      <FlatList
        data={repositoryNodes}
        style={styles.flatListStyle}
        ListHeaderComponent={
          <>
           <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Buscar repositorios..."
            value={searchKeyword}
            onChangeText={setSearchKeywords}
            role="search"
            left={
            <TextInput.Icon icon="magnify" /> 
          }
          />
          {
          repositoryNodes.length === 0?
          <Text style={styles.emptyText}>No repositories found</Text>:
          <OrderSelector orderBy={orderBy} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
          }
          </>
        }
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item  }) => renderItem({ item ,handlePress })}
        keyExtractor={(item)=>item.id}
        onEndReached={onEndReach} 
        onEndReachedThreshold={0.5} 
      />
    );
};

export default RepositoryListContainer;