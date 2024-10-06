import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.", { position: 'top-center' });
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: 'top-center' });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user.", { position: 'top-center' });
      }
    }
  };

  return (
    <div className='userTable'>
      <h2 className='header'>User Management App</h2>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table className='userTable-content'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td> 
              <td>{user.address}</td> 
              <td className='actionButtons'>
                <Link to={`/edit/${user._id}`} className='editButton'>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button className='deleteButton' onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
