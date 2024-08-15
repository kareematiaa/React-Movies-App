import axios from "axios";
import React, { useEffect, useState } from "react";

export default function People() {
  useEffect(() => {
    getPeople();
  }, []);

  const [people, setPeople] = useState([]);

  const img_path = "https://image.tmdb.org/t/p/w500/";

  let getPeople = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day",
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODRkZmFiMmIzNzUwYmY2NjdlMmVmNDJkYWEyZTgzZiIsInN1YiI6IjY0YjUyOWM5MGJiMDc2MDBjYWY5YTZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5qmKDvxUhj2WxtL8gtHNGKJ8j8Oz8T4wCLCpK-_pHSk",
        },
      }
    );
    console.log(data.results);
    setPeople(data.results);
  };

  return (
    <>
      {
        <div className="row">
          {people.map((people, index) => (
            <div key={index} className="col-md-2">
              <div className="item py-3">
                <img className="w-100" src={img_path + people.profile_path} />
                <h3>{people.name}</h3>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}