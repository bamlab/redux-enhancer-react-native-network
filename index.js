import NetInfo from "@react-native-community/netinfo";

export const STATUS_CHANGED = "STATUS_CHANGED";

export default () => createStore => (...args) => {
  const store = createStore(...args);

  const checkConnection = (state) => {
    store.dispatch({
      type: STATUS_CHANGED,
      payload: state.isConnected
    });
  };

  // Set it first ( needed when used with react-native-web )
  NetInfo.fetch().then((state) => {
    checkConnection(state.isConnected)
  });

  NetInfo.addEventListener("connectionChange", checkConnection);

  return store;
};
