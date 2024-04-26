import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");

  return (
    <>
      <div>
        <Context.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            blogs,
            setBlogs,
            mode,
            setMode,
          }}
        >
          <App />
        </Context.Provider>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
