import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { Flowbite, useTheme } from "flowbite-react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
const client = new ApolloClient({
  uri: "https://demo-experience-api.masaischool.com/",
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Flowbite theme={{ usePreferences: false }}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </ApolloProvider>
    </React.StrictMode>
  </Flowbite>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
