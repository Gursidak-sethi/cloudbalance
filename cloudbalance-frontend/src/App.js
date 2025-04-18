import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./configs/AxiosConfig";
import RootNavigation from "./RootNavigation";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <RootNavigation />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
