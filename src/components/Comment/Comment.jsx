import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(id);
  const fetchComment = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://basic-node-app1.herokuapp.com/api/v1/comment/${id}`
    );
    try {
      console.log(data);

      setComments(data.data);
      setLoading(false);
    } catch (error) {
      clg(error.message);
    }
  };
  useEffect(() => {
    fetchComment();
  }, []);
  return (
    <div>
      <h1 style={{ fontSize: "20px" }}>Total Comments : {comments.length}</h1>

      {loading && (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader
            type="TailSpin"
            color="#000"
            height={80}
            width={80}
            timeout={10000}
          />
        </div>
      )}
      {comments.length === 0 && (
        <h1 style={{ fontSize: "30px" }}>No Comments To Display</h1>
      )}
      {comments ? (
        comments.map((value) => {
          return (
            <>
              <h1 style={{ fontSize: "30px", padding: "20px" }}>
                {value.comment}
              </h1>
            </>
          );
        })
      ) : (
        <h1>No Commets</h1>
      )}
    </div>
  );
};

export default Comment;
