import NetInfo from "@react-native-community/netinfo";

export const STATUS_CHANGED = "STATUS_CHANGED";

export default () => createStore => (...args) => {
  const store = createStore(...args);

  const checkConnection = isConnected => {
    store.dispatch({
      type: STATUS_CHANGED,
      payload: { isConnected }
    });
  };

  // Set it first ( needed when used with react-native-web )
  NetInfo.isConnected.fetch().then((isConnected) => {
  	checkConnection(isConnected)
  });

  NetInfo.isConnected.addEventListener("connectionChange", checkConnection);

  return store;
};
