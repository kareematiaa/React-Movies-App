import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [trending, setTrending] = useState([]);

  const img_path = "https://image.tmdb.org/t/p/w500/";
  useEffect(() => {
    getTrendingItems();
  }, []);

  let getTrendingItems = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day",
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODRkZmFiMmIzNzUwYmY2NjdlMmVmNDJkYWEyZTgzZiIsInN1YiI6IjY0YjUyOWM5MGJiMDc2MDBjYWY5YTZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5qmKDvxUhj2WxtL8gtHNGKJ8j8Oz8T4wCLCpK-_pHSk",
        },
      }
    );
    //console.log(data.results);
    setTrending(data.results);
  };

  return (
    <>
      {
        <div className="row">
          {trending.map((trend, index) => (
            <div key={index} className="col-md-2">
              <div className="item py-3">
                <img
                  className="w-100"
                  src={img_path + trend.poster_path}
                  alt=""
                />
                <h3>{trend.title}</h3>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
