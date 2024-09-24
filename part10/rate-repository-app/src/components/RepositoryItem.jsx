import { StyleSheet, Text, View } from "react-native"

const RepositoryItems = ({ repositories }) => {
  return(
    <View>
      {repositories.map((repository,I) => (
        <View key={I} style={styles.OneView}>
          <Text>Full Name: {repository.fullName}</Text>
          <Text>Description: {repository.description}</Text>
          <Text>Language: {repository.language}</Text>
          <Text>Stars: {repository.stargazersCount}</Text>
          <Text>Forks: {repository.forksCount}</Text>
          <Text>Reviews: {repository.reviewCount}</Text>
          <Text>Rating: {repository.ratingAverage}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  OneView:{
    marginTop:10,
  }
});

export default RepositoryItems;