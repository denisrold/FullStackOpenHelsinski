import ReviewItem from "../OneRepository/ReviewItem";
import { Text, FlatList, Pressable, StyleSheet, View, Alert } from "react-native";
import theme from "../../theme";
import useMyReviews from "../../hooks/useMyReviews";
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphQL/mutations';
import { useNavigate } from 'react-router-native';

const MyReviewsView = () => {
  const { loading, error, reviews, refetch } = useMyReviews();
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigation = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteReview({ variables: { id } });
      refetch(); // Refresca la lista de reseñas después de eliminar
    } catch (error) {
      console.error("Error eliminando la reseña:", error);
    }
  };

  const renderFooter = (review) => (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => navigation(`/repository/${review.repositoryId}`)}
      >
        <Text style={styles.textFlex}>View repository</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => {
          const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta reseña?");
          if (confirmed) {
            handleDelete(review.id);
          }
          Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar esta reseña?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Eliminar", onPress: () => handleDelete(review.id) }
            ]
          );
        }}
      >
        <Text style={styles.textFlex}>Delete review</Text>
      </Pressable>
    </View>
  );

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <>
          <ReviewItem myReviews={true} review={item} />
          {renderFooter(item)}
        </>
      )}
    keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  textFlex: {
    textAlign: 'center',
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  separator: {
    height: 20,
  },
});

export default MyReviewsView;