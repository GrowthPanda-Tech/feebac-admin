import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import CategoryContextProvider from "./contexts/CategoryContext.jsx";
import ProfileContextProvider from "./contexts/ProfileContext.jsx";
import FilterContextProvider from "./contexts/FilterContext.jsx";

//TODO: damn..
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProfileContextProvider>
          <CategoryContextProvider>
            <FilterContextProvider>
              <App />
            </FilterContextProvider>
          </CategoryContextProvider>
        </ProfileContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
