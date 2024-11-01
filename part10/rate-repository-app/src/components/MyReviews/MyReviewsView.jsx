import ReviewItem from "../OneRepository/ReviewItem";
import { Button,Text, FlatList, Pressable, StyleSheet, View } from "react-native";
import theme from "../../theme";
import useMyReviews from "../../hooks/useMyReviews";

const MyReviewsView = () => {

  const renderFooter = () =>{
    const handleFirstButtonClick = () => {
      console.log('Primer botón presionado');
    };
  
    const handleSecondButtonClick = () => {
      console.log('Segundo botón presionado');
    };
    return (
    <View style={styles.buttonContainer}>
      <Pressable  style={styles.button} onPress={handleFirstButtonClick} >
        <Text style={styles.textFlex}>View repository</Text>
      </ Pressable>
      <Pressable  style={[styles.button, {backgroundColor:'red'}]} onPress={handleSecondButtonClick} >
        <Text style={styles.textFlex}>Delete review</Text>
      </Pressable>
    </View>
  );}

  const { loading, error, reviews } = useMyReviews();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <FlatList
      data={reviews} 
      renderItem={({ item }) => <ReviewItem renderFooter={renderFooter} myReviews={ true } review={item} />}
      keyExtractor={item => item.id} 
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor:theme.colors.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between', // Asegúrate de que el espacio entre los botones esté bien
    padding: 10, // Añade un poco de padding si es necesario
  },
  button: {
    flex: 1, // Cada botón ocupará el mismo espacio
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: '#007BFF', // Color de fondo del botón
    padding: 15, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
  },

  textFlex:{
    textAlign: 'center', // Centra el texto
    flexWrap: 'wrap',
    textAlign: 'center',
    flexShrink: 1,  
    color:theme.colors.darkPrimary,
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bold 
  },
  separator: {
    height: 20,
  },
});

export default MyReviewsView;