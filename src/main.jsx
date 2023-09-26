import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CategoryContextProvider from "./contexts/CategoryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CategoryContextProvider>
                    <App />
            </CategoryContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
