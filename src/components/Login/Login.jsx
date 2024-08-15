import axios, { AxiosError } from "axios";
import joi from "joi";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorsList, setErrorsList] = useState([]);

  let navigate = useNavigate();

  let submitFormData = (e) => {
    e.preventDefault();

    let validationResponse = validateFormData();

    //console.log(validationResponse);

    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      axios
        .post("https://localhost:7162/api/Accounts/login", user)
        .then(function (response) {
          let data = response.data;
          localStorage.setItem("token", data.token);
          saveUserData();
          navigate("/");
          //console.log(data);
        })

        .catch(function (error) {
          let errors = error.response.data;
          setErrorMsg(errors);
        });
    }
  };

  let validateFormData = () => {
    const schema = joi.object({
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi.string().required(),
    });
    return schema.validate(user);
  };

  let getInputValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <>
      <div className="m-auto w-50 mt-5">
        <h2>Login Form</h2>

        <form>
          <div className="input-data my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="email"
            />
          </div>

          <div className="input-data my-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={getInputValue}
              type="password"
              className="form-control my-2"
              name="password"
            />
          </div>
          {errorsList[0] ? (
            <div className="text-danger">
              <p>{errorsList[0].message}</p>
            </div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div className=" text-danger">{errorMsg.message}</div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-center">
            <button onClick={submitFormData} className="btn btn-success my-3 ">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
