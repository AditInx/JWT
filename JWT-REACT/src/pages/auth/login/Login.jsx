import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if(!response.ok){
          throw new Error(result.message || "Invalid credentials");
        }
        localStorage.setItem("token",result.token);
        console.log(result);
        navigate("/dashboard");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setFormData({
          email: "",
          password: "",
        });
      }
    };
  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            />
            </Form.Group>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
      </Form>
    </div>
  );
};

export default Login;
