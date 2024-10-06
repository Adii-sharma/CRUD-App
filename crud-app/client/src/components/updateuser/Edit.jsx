import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css"; 
import toast from 'react-hot-toast';

const Edit = () => {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    phone: "", 
    address: "", 
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        console.log("response--->", response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error fetching user data.", { position: "top-center" });
      });
  }, [id]);

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    if (!isValidPhoneNumber(user.phone)) {
      toast.error("Please enter a valid contact number (10 digits).", { position: "top-center" });
      return;
    }

    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch(error => {
        console.log(error);
        toast.error("Error updating user.", { position: "top-center" });
      });
  };

  return (
    <div className='addUser'>
      <Link to={"/"} className="backLink">Back</Link>
      <h3 className="pageTitle">Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input 
            type="text" 
            value={user.fname} 
            onChange={inputChangeHandler} 
            id="fname" 
            name="fname" 
            autoComplete='off' 
            placeholder='First Name' 
            required 
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input 
            type="text" 
            value={user.lname} 
            onChange={inputChangeHandler} 
            id="lname" 
            name="lname" 
            autoComplete='off' 
            placeholder='Last Name' 
            required 
          />
        </div>
        <div className="inputGroup email">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            value={user.email} 
            onChange={inputChangeHandler} 
            id="email" 
            name="email" 
            autoComplete='off' 
            placeholder='Email' 
            required 
          />
        </div>
        <div className="inputGroup contactNo">
          <label htmlFor="phone">Contact No</label>
          <input 
            type="tel" 
            value={user.phone} 
            onChange={inputChangeHandler} 
            id="phone" 
            name="phone" 
            autoComplete='off' 
            placeholder='Enter contact number' 
            required 
          />
        </div>
        <div className="inputGroup address">
          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            value={user.address} 
            onChange={inputChangeHandler} 
            id="address" 
            name="address" 
            autoComplete='off' 
            placeholder='Enter address' 
            required 
          />
        </div>
        <div className="inputGroup btn-div">
          <button type="submit" className="submitButton">Update User</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
