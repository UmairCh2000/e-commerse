import React, { useEffect } from "react";
import "./aboutUs.css";
import about from "../../assets/images/About Us/image.png";
import mission from "../../assets/images/About Us/image1.png";
import vision from "../../assets/images/About Us/image2.png";
import { NavLink } from "react-router-dom";
import Aos from "aos";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="container-block mainContainer">
        <div
          className="container-block Container bottomContainer"
          data-aos="fade-left"
        >
          <img className="mainImg" src={about} />
          <div className="allText bottomText">
            <p className="headingText">About Us</p>
            <p className="subHeadingText">Embracing Timeless Elegance</p>
            <p className=" description">
              At Timeless classNameics, we embrace the essence of timeless
              elegance through our curated collection of products. Our online
              store is more than just a platform; it's a homage to enduring
              quality and classNameic style.
            </p>
          </div>
        </div>

        <div className="container-block Container">
          <img className="mainImg" src={mission} />
          <div className="allText bottomText">
            <p className=" headingText">Our Mission</p>
            <p className=" subHeadingText">Curating Enduring Quality</p>
            <p className=" description">
              Our mission at Timeless classNameics is to curate a selection of
              products that embody enduring quality and craftsmanship. We aim to
              inspire individuals to embrace classNameic elegance in their
              everyday lives by offering meticulously selected items that
              transcend fleeting trends.
            </p>
          </div>
        </div>
        <div className="container-block Container bottomContainer">
          <img className="mainImg" src={vision} />
          <div className="allText bottomText">
            <p className=" headingText">Our Vision</p>
            <p className=" subHeadingText">
              Redefining E-Commerce Sophistication
            </p>
            <p className=" description">
              Our vision is to become the premier destination for those who
              appreciate the timeless allure of classNameic products. We strive
              to redefine the essence of e-commerce sophistication by offering a
              curated selection that reflects enduring style and unmatched
              quality. Join us as we redefine the boundaries of timeless beauty
              and craftsmanship in the digital age.
            </p>
            <li>
              <NavLink to="/contactus" exact="true" className="explore">
                Contact Us
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
