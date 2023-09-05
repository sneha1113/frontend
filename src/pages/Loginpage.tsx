import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

async function logindetails(user_name: string, pass_word: string) {
  try {
    const URL = 'https://movie-lcnz.onrender.com/login/';
    const response = await axios.post(URL, {
      email: user_name,
      password: pass_word,
    });

    return response.data;
  } catch (error) {
    return null;
  }
}

function Loginpage() {
  const formData = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handlesignup = () => {
    navigate('/register');
  };

  const add = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user_name = formData?.current?.username.value;
    const pass_word = formData?.current?.u_password.value;

    const results = await logindetails(user_name, pass_word);

    if (results && results.message === 'Login successful') {
      navigate('/homepage', { state: { show: results.user, user_id: results.user._id } });
    } else {
      alert('Incorrect credentials');
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
                <h2>LOGIN</h2>
                <div className="info">
                  <div className="form-group">
                    <input
                      className="email"
                      type="text"
                      placeholder="Enter Email"
                      name="username"
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
                    Login
                  </button>
                </div>

                <div className="btn">
                  <button className="btn-primaryup" onClick={handlesignup}>
                    Signup
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

export default Loginpage;
