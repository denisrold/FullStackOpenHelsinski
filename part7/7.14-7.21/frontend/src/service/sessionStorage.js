function saveUserSession(sessionLoggedName, userLogObject) {
  localStorage.setItem(sessionLoggedName, JSON.stringify(userLogObject));
}

function saveData(key = "tokenExpires", value) {
  const data = {
    value: value,
    // date and hour save.
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(data));
}
function getData(
  key = "tokenExpires",
  maxDays = 0,
  maxHours = 1,
  TokenDataName
) {
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) {
    return null;
  }
  const currentTime = new Date().getTime();

  const timeDiff = currentTime - data.timestamp;

  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  // verify maxdays and maxhours
  if (daysDiff > maxDays && hoursDiff > maxHours) {
    localStorage.removeItem(key);
    localStorage.removeItem(TokenDataName);
    return null;
  }
  return data.userLog;
}
function removeStorageData(storageLoggedUser) {
  localStorage.removeItem(storageLoggedUser);
}
// Example of uses:
// saveData("tokenExpires", "TokenDataName");

// const sessionData = getData("tokenExpires", 0, 1, "TokenDataName");

async function getUserToken() {
  const userToken = window.localStorage.getItem("userLogged");
  if (!userToken) {
    return null;
  }
  const { token } = await JSON.parse(userToken);
  return token;
}

export default {
  saveData,
  getData,
  removeStorageData,
  saveUserSession,
  getUserToken,
};
