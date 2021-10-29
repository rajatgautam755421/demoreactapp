import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Update.css";
import { useHistory, useParams } from "react-router-dom";

function Update() {
  const [article, setArticle] = useState({});
  const [check, setCheck] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const findAArticle = async () => {
    const { data } = await axios.get(
      `https://basic-node-app1.herokuapp.com/api/v1/upload/${id}`
    );
    try {
      setArticle(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    findAArticle();
  }, []);

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
      } else {
        setLoading(true);
        axios.put(`http://localhost:5000/api/v1/update/${id}`, formData);
        toast.success("Article Updated");
        setSelect(false);
        setLoading(false);
        setTitle("");
        setDescription("");
        setCategoryImage("");
        setImage(null);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheck = () => {
    setCheck(!check);
    if (check) {
      setTitle("");
      setDescription("");
      setImage("");
      setSelect(false);
    } else {
      setTitle(article.title1);
      setDescription(article.desc1);
      setImage(`/uploads/${article.img1}`);
      setSelect(true);
    }
  };
  console.log(title, description, image);
  return (
    <div className="App">
      <h1 style={{ fontSize: "30px", marginTop: "20px" }}>Update Your Post</h1>

      <ToastContainer />
      <div className="container" style={{ marginTop: "30px" }}>
        <label>Reset Post</label>
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          value={check}
          onChange={handleCheck}
          style={{ marginLeft: "20px" }}
        />
      </div>
      <div className="container" style={{ marginTop: "40px", width: "40vw" }}>
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
          {/* <div className="mb-3">
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              fileName="categoryImage"
              onChange={onChangeFile}
            />
          </div> */}
          {/* {select && (
            <div className="container image__ani">
              <img
                src={image}
                style={{
                  width: "200px",
                  height: "200px",
                  border: "0px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div> */}
          {/* )} */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px", width: "100px" }}
          >
            Update
            {loading && <h1>Loading...</h1>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
