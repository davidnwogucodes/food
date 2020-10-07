import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [dateintime, setDateintime] = useState("");
  const [dateindays, setDateindays] = useState("");
  const [phone_number, setPhonenumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5050/api/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: { name, password, location, phone_number },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timecount = setInterval(() => {
      setDateintime(moment().format("HH:mm"));
    }, 1000);
    return () => {
      clearInterval(timecount);
    };
  }, []);
  useEffect(() => {
    let datecount = setInterval(() => {
      setDateindays(moment().format("MMMM, Do YYYY"));
    }, 1000);
    return () => {
      clearInterval(datecount);
    };
  }, []);

  return (
    <div className="signupbody">
      <div className="time">
        <h1>{dateintime}</h1>
        <span className="date">
          <h4>{dateindays}</h4>
        </span>
      </div>

      <section className="signupsection">
        <span className="signuptxt">
          <h1>Get Started Now</h1>
        </span>
        <form onSubmit={handleSubmit} className="signup">
          <input
            type="Name"
            placeholder="name"
            value={name}
            onChange={(evt) => {
              // if (evt.target.value.length <= 10) {
              setName(evt.target.value);
              // }
            }}
          />
          <p
            style={{
              color: "red",
              display: name.split(" ").length < 2 ? "flex" : "none",
            }}
          >
            {name.split(" ").length < 2 &&
              "please provide a first name and a last name"}
          </p>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(key) => {
              setPassword(key.target.value);
            }}
          />
          <p
            style={{
              color: "orange",
              display:
                (password.length < 4) & (password.length !== 0)
                  ? "flex"
                  : "none",
            }}
          >
            too easy
          </p>
          <input
            type="phonenumber"
            placeholder="phone number"
            value={phone_number}
            onChange={(digits) => {
              setPhonenumber(digits.target.value);
            }}
          />
          <input
            type="location"
            placeholder="location"
            value={location}
            onChange={(area) => {
              setLocation(area.target.value);
            }}
          />
          <p
            style={{
              color: "red",
              display: location.length < 10 ? "flex" : "none",
            }}
          >
            pleaase provide a valid location
          </p>
          <span className="privacytxt">
            {/* <input type="checkbox" name="" id="" /> */}
            <h3>i agree to the websites privacy policy and terms</h3>
          </span>
          <button className="btn">Sign up</button>
        </form>
      </section>
    </div>
  );
}
