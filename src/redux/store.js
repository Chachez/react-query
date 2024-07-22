import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./rootReducer"; // Assuming your reducer is properly set up

const persistConfig = {
  key: "root",
  storage,
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  // Create the store with only persistedReducer and dev tools
  const store = createStore(
    persistedReducer,

    composeWithDevTools(applyMiddleware(...middleware)) // No middleware or additional enhancers
  );

  const persistor = persistStore(store);
  return { store, persistor };
}
