import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactTooltip from "react-tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loader from "react-loader-spinner";

const HomeCard = ({ id, title, image, desc }) => {
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const handleDelete = async () => {
    const { data } = axios.delete(
      `https://basic-node-app1.herokuapp.com/api/v1/upload/delete/${id}`
    );
    try {
      toast.info(`${title} is deleted`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "https://basic-node-app1.herokuapp.com/api/v1/like",
      {
        post: id,
      }
    );
    setLoading(false);
    try {
      //   console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLikes = async () => {
    const { data } = await axios.get(
      "https://basic-node-app1.herokuapp.com/api/v1/like/"
    );
    try {
      setLike(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getLikes();
  }, [like]);
  const filerData = like.filter((value) => {
    return value._id === id;
  });

  const handleComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "https://basic-node-app1.herokuapp.com/api/v1/comment",
      {
        comment: comment,
        post: id,
      }
    );
    try {
      console.log(data);
      setComment("");
      toast.success("Comment Posted");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container article" style={{ position: "relative" }}>
        <ToastContainer />

        <h3 className="article__title">{title}</h3>
        <img
          src={`./uploads/${image}`}
          alt=""
          srcset=""
          style={{ width: "350px", height: "350px" }}
        />
        <h3 className="article__desc">{desc}</h3>
        <ReactTooltip />

        <DeleteIcon
          onClick={handleDelete}
          style={{
            color: "red",
            width: "2rem",
            height: "2rem",
            position: "absolute",
            top: "10",
            right: "10",
            cursor: "pointer",
          }}
          data-tip="Delete This Post"
          className="delete"
        />

        <Link to={`/update/post/${id}`}>
          <EditIcon
            style={{
              width: "2rem",
              height: "2rem",
              position: "absolute",
              top: "10",
              right: "50",
              cursor: "pointer",
            }}
            data-tip="Update This Post"
          />
        </Link>
        <div className="container">
          <FavoriteIcon
            style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
            className="like"
            data-tip="Like This Post"
            onClick={handleLike}
          />

          {loading ? (
            <Loader
              type="TailSpin"
              color="#000"
              height={40}
              width={40}
              timeout={10000}
              style={{
                position: "absolute",
                bottom: "40px",
                right: "100px",
                bottom: "30px",
                marginRight: "150px",
              }}
            />
          ) : (
            <>
              {" "}
              <h2
                style={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  fontSize: "20px",
                }}
              >
                Total Likes :{" "}
                {filerData.length !== 0 ? filerData[0].totalLikes : "0"}
              </h2>
            </>
          )}
        </div>
        <Link to={`/comments/${id}`} style={{ textDecoration: "none" }}>
          <h1 style={{ textDecoration: "none" }}>View All Comments</h1>
        </Link>
      </div>
      <form onSubmit={handleComment}>
        <div className="container" style={{ width: "42vw" }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            class="
          block
                      w-full
                      px-5
                      py-3
                      mt-2
                      text-base text-neutral-600
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                     
                      rounded-lg
                      bg-white-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                      apearance-none
                      autoexpand
                    "
            id="description"
            type="text"
            name="description"
            placeholder="Comment..."
            required=""
            style={{ border: "2px solid lightgrey" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr className="article__hr" />
    </>
  );
};

export default HomeCard;
