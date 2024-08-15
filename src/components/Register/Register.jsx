import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorsList, setErrorsList] = useState([]);

  let validateFormData = () => {
    const schema = joi.object({
      displayName: joi.string().required().alphanum().min(3).max(10),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      phoneNumber: joi.number().required(),
      password: joi.string().required(),
    });
    return schema.validate(user);
  };

  let navigate = useNavigate();

  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      axios
        .post("https://localhost:7162/api/Accounts/register", user)
        .then(function (response) {
          navigate("/");
          console.log(response.data);
        })
        .catch(function (error) {
          let errors = error.response.data;
          setErrorMsg(errors);
          console.log(errors);
        });
    }
  };

  let getInputValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    //console.log(myUser);
  };
  return (
    <>
      <div className="m-auto w-50 mt-5">
        <h2>Register Form</h2>

        <form>
          <div className="input-data my-2">
            <label htmlFor="full_name">Full Name</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="displayName"
            />
          </div>
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
            <label htmlFor="phone_number">Phone Number</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="phoneNumber"
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
            {/* <div className=" text-danger">
              {errorsList.map((error, index) => (
                <div key={index} className=" text-danger">
                  {error.path == "password" ? <p>{error.message}</p> : ""}
                </div>
              ))}
            </div> */}
          </div>
          {errorsList[0] ? (
            <div className="text-danger">
              <p>{errorsList[0].message}</p>
            </div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div className=" text-danger">{errorMsg.errors}</div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-center">
            <button onClick={submitFormData} className="btn btn-success my-3">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
