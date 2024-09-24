import { StyleSheet, Text, View } from "react-native"

const RepositoryItems = ({ item }) => {
  return(
        <View style={styles.OneView}>
          <Text>Full Name: {item.fullName}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Language: {item.language}</Text>
          <Text>Stars: {item.stargazersCount}</Text>
          <Text>Forks: {item.forksCount}</Text>
          <Text>Reviews: {item.reviewCount}</Text>
          <Text>Rating: {item.ratingAverage}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
  OneView:{
    marginTop:10,
  }
});

export default RepositoryItems;