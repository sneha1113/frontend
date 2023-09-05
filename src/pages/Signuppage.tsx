import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/loginpage.css';

function Signuppage() {
  const formData = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate('/');
  };

  const add = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newProduct = {
      firstName: formData?.current?.firstName.value,
      lastName: formData?.current?.lastName.value,
      email: formData?.current?.u_email.value,
      password: formData?.current?.u_password.value,
    };

    const signupURL = `https://movie-lcnz.onrender.com/signup/`;

    try {
      const response = await axios.post(signupURL, newProduct);
      
      if (response.data.message === "successful") {
        alert("REGISTERED SUCCESSFULLY");
      } else {
        alert("ERROR");
      }
    } catch (error) {
      alert("ERROR");
    }
  };

  return (
    <header className="showcase">
      <div className="bg-img">
        <div className="header">
          <div className="logo"></div>
          <div className="showcase-content">
            <div className="formm">
              <form onSubmit={add} ref={formData}>
                <h2>Register</h2>
                <div className="info">
                  <div className="form-group">
                    <input
                      className="email"
                      type="email"
                      placeholder="Email"
                      name="u_email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      className="email"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      className="email"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      className="email"
                      type="password"
                      placeholder="Password"
                      name="u_password"
                      required
                    />
                  </div>
                </div>

                <div className="btn">
                  <button className="btn-primary" type="submit">
                    Register
                  </button>
                </div>

                <div className="btn">
                  <button className="btn-primaryup" onClick={handlelogin}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Signuppage;
