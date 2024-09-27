import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken(username, password) {}

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
    } catch (err) {
      throw Error(err.message);
    }
  }

  removeAccessToken() {
    // Remove the access token from the storage
  }
}

export default AuthStorage;
