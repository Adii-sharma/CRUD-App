import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./add.css";
import toast from "react-hot-toast";

const Add = () => {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    for (const key in user) {
      if (!user[key]) {
        toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`, { position: "top-center" });
        return;
      }
    }
    
    if (!isValidPhoneNumber(user.phone)) {
      toast.error("Please enter a valid 10-digit contact number", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      toast.success(response.data.msg, { position: "top-center" });
      navigate("/");
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data) {
        const message = error.response.data.message || "An error occurred";
        errorMessage = message; 
      }
      toast.error(errorMessage, { position: "top-center" });
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"} className="backLink">Back</Link>
      <h3 className="pageTitle">Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="inputGroup email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="inputGroup contactNo ">
          <label htmlFor="phone">Contact No</label>
          <input
            type="tel"
            onChange={inputHandler}
            id="phone"
            name="phone"
            autoComplete="off"
            placeholder="Enter contact number"
            required
          />
        </div>
        <div className="inputGroup address">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            onChange={inputHandler}
            id="address"
            name="address"
            autoComplete="off"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="inputGroup password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="inputGroup btn-div">
          <button type="submit" className="submitButton">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
