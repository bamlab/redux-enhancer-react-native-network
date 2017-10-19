import { NetInfo } from "react-native";

export const STATUS_CHANGED = "STATUS_CHANGED";

export default () => createStore => (...args) => {
  const store = createStore(...args);

  const checkConnection = isConnected => {
    store.dispatch({
      type: STATUS_CHANGED,
      payload: { isConnected }
    });
  };

  NetInfo.isConnected.addEventListener("connectionChange", checkConnection);

  return store;
};
