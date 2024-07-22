import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Slide } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";
import "./index.css";
import createStore from "./redux/store";

const { store, persistor } = createStore();
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (6 * 1000) } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
            preventDuplicate
            dense
            maxSnack={5}
          >
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
