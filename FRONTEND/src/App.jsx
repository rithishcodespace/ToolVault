import { Provider } from "react-redux";
import Store from "./utils/Store";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <Provider store={Store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
