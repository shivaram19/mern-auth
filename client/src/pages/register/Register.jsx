import React,{useState} from 'react'
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import "./Register.scss"
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    college: "",
    dateOfBirth: ""

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/register", {
        ...user
      });
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='register'>
        <form onSubmit={handleSubmit} className='form'>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
            <label htmlFor="">Date of Birth</label>
            <input 
              type="date"
              name="DOB"

            />
            <label htmlFor="">Password</label>
            <input name="password" type="password" onChange={handleChange} />
            <label htmlFor="">College</label>
            <input
              name="college"
              type="text"
              placeholder="IITM"
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </div>
        </form>
    </div>
  )
}

export default Register
            
      
