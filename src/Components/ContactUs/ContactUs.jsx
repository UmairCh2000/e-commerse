import React from "react";
import "../ContactUs/contactUs.css";
import call from "../../assets/icons/Contact Us/phone-call.png";
import web from "../../assets/icons/Contact Us/web.png";
import email from "../../assets/icons/Contact Us/email.png";
import insta from "../../assets/icons/Contact Us/instagram.png";
import { useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <div className="body">
        <h2>Contact Us</h2>
        <div data-aos="fade-up" className="contain">
          <div className="contact-info">
            <img src={call} alt="" />
            <p>Call us at: +92-331-2566730</p>
            <img src={email} alt="" />
            <p>Email us at: umair.munawar2000@gmail.com</p>
            <img src={web} alt="" />
            <p>
              Visit us at:{" "}
              <a target="blank" href="https://emergen.io">
                www.timeless.com
              </a>
            </p>
            <img src={insta} alt="" />
            <p>
              Follow us on Instagram:{" "}
              <a
                href="https://www.instagram.com/timeless_classics_tc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @timeless_classics_tc
              </a>
            </p>
          </div>
          <div className="contact-info">
            <div className="form" action="/signin" method="post">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
              {!token && <input type="button" id="name" name="name" required />}
              {token && <Link to="/signin" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
