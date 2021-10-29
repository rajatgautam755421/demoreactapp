import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
function Upload() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [image, setImage] = useState(null);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChangeFile = (e) => {
    setCategoryImage(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelect(true);
    } else {
      setSelect(false);
    }
  };

  const onChangeClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryImage", categoryImage);
    try {
      if (title === "") {
        toast.error("Title can't be empty");
      } else if (description === "") {
        toast.error("Description can't be empty");
      } else if (categoryImage === "") {
        toast.error("Image can't be empty");
      } else {
        setLoading(true);
        axios.post(
          "https://basic-node-app1.herokuapp.com/api/v1/upload",
          formData
        );
        toast.success("Article Posted");
        setSelect(false);
        setLoading(false);
        setTitle("");
        setDescription("");
        setCategoryImage("");
        setImage(null);
        history.push("/");
      }
    } catch (error) {
      if (error.code === "500") {
        toast.error(error);
      }
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <div
        className="container main__form"
        style={{ marginTop: "40px", width: "40vw" }}
      >
        <form onSubmit={onChangeClick} encType="multipart/form-data">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control-file custom-file-input"
              id="exampleFormControlFile1"
              fileName="categoryImage"
              onChange={onChangeFile}
            />
          </div>
          {select && (
            <div className="container image__ani">
              <img
                src={image}
                style={{
                  width: "200px",
                  height: "200px",
                  border: "0px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "50%",
                }}
              />
              <CloseIcon
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => {
                  setImage(null);
                  setSelect(false);
                  setCategoryImage("");
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px", width: "100px" }}
          >
            Post
            {loading && <h1>Loading...</h1>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
