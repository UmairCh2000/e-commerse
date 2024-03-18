import React from "react";
import "../Footer/footer.css";
import { NavLink } from "react-router-dom";
import call from "../../assets/icons/Contact Us/phone-call.png";
import web from "../../assets/icons/Contact Us/web.png";
import email from "../../assets/icons/Contact Us/email.png";
import insta from "../../assets/icons/Contact Us/instagram.png";

const Footer = () => {
  return (
    <footer className="siteFooter">
      <div className="footerContainer">
        <div className="footerAbout">
          <h1>About Us</h1>
          <h4>Embracing Timeless Elegance</h4>
          <p>
            At Timeless classNameics, we embrace the essence of timeless
            elegance through our curated collection of products. Our online
            store is more than just a platform; it's a homage to enduring
            quality and classNameic style.
          </p>
        </div>

        <div className="footerLinks">
          <h1>Qiuck Links</h1>
          <ul>
            <li>
              <NavLink to="/home" exact="true">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" exact="true">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" exact="true">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" exact="true">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footerContact">
          <h1>Contact Us</h1>
          <div className="call">
            <img src={call} alt="" />
            <p>Call us at: +92-331-2566730</p>
          </div>

          <div className="email">
            <img src={email} alt="" />
            <p>Email us at: umair.munawar2000@gmail.com</p>
          </div>

          <div className="web">
            <img src={web} alt="" />
            <p>
              Visit us at:{""}
              <a target="blank" href="https://emergen.io">
                www.timeless.com
              </a>
            </p>
          </div>

          <div className="insta">
            <img src={insta} alt="" />
            <p>
              Follow us on Instagram:{""}
              <a
                href="https://www.instagram.com/timeless_classics_tc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @timeless_classics_tc
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="footerCopyright">
        <p className="copyrightText">
          Copyright &copy; 2023 All Rights Reserved by{" "}
          <a
            href="https://www.instagram.com/timeless_classics_tc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Timless Classics
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
