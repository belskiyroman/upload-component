import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import UploadForm from "./pages/UploadForm/UploadForm";
import * as serviceWorker from "./serviceWorker";

const { CloudinaryContext } = require("cloudinary-react");

ReactDOM.render(
  <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_NAME}>
    <UploadForm />
  </CloudinaryContext>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
