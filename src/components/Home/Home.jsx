import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Loader from "react-loader-spinner";
import HomeCard from "./HomeCard";

const Home = () => {
  const [upload, setUpload] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://basic-node-app1.herokuapp.com/api/v1/upload"
    );
    setLoading(false);
    try {
      setUpload(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {upload.length === 0 && (
        <h1 style={{ fontSize: "30px", textAlign: "center" }}>
          No Posts To Display
        </h1>
      )}
      {loading && (
        <div
          className="container"
          style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        >
          <Loader
            type="ThreeDots"
            color="#000"
            height={200}
            width={200}
            timeout={3000}
          />
        </div>
      )}
      {upload.map((value) => {
        return (
          <>
            <HomeCard
              id={value._id}
              title={value.title}
              image={value.categoryImage}
              desc={value.description}
            />
          </>
        );
      })}
    </div>
  );
};

export default Home;
