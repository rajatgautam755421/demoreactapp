import React from "react";
import Upload from "./components/upload/Upload";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Update from "./components/Update/Update";

import { ToastContainer } from "react-toastify";
import Comment from "./components/Comment/Comment";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/upload" exact>
          <Upload />
        </Route>
        <Route path="/update/post/:id" exact>
          <Update />
        </Route>
        <Route path="/comments/:id" exact>
          <Comment />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
