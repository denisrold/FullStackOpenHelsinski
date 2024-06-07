function saveUserSession(loggedNoteAppUser, userLog) {
  window.localStorage.setItem(loggedNoteAppUser, JSON.stringify(userLog));
}

function saveData(key = "tokenExpires", value, userLog) {
  const data = {
    value: value,
    userLog: JSON.stringify(userLog),
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
function removeStorageData(storageUser) {
  window.localStorage.removeItem(storageUser);
}
// Example of uses:
// saveData("tokenExpires", "TokenDataName");

// const sessionData = getData("tokenExpires", 0, 1, "TokenDataName");

export default { saveData, getData, removeStorageData, saveUserSession };
