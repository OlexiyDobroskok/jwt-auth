import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appRouter } from "./appRouter";
import { appStore, persistor } from "./appStore";
import { refreshThunk } from "features/authentication/refresh";

const initApp = () => {
  persistor.subscribe(() => {
    const { session } = appStore.getState();
    if (session.accessToken) {
      appStore.dispatch(refreshThunk());
    }
  });
};

initApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ReduxProvider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
