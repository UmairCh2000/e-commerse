import React, { useEffect, useState } from "react";

import "./home.css";
import topimage from "../../assets/images/Home/landimage1.png";
import leftimage from "../../assets/images/Home/porimage1.png";
import rightimage from "../../assets/images/Home/porimage2.png";
import bottomimage from "../../assets/images/Home/landimage2.png";

import quality from "../../assets/icons/Home/Features/quality.png";
import ship from "../../assets/icons/Home/Features/shipping.png";
import support from "../../assets/icons/Home/Features/support.png";
import warrant from "../../assets/icons/Home/Features/warranty.png";

import ck from "../../assets/images/Home/Logo/calvin.png";
import ch from "../../assets/images/Home/Logo/chanel.png";
import denim from "../../assets/images/Home/Logo/denim.png";
import lv from "../../assets/images/Home/Logo/lv.png";
import prada from "../../assets/images/Home/Logo/prada.png";
import cart from "../../assets/images/Home/Logo/icon.png";
import FUimg1 from "../../assets/images/Home/FollowUs/image1.png";
import FUimg2 from "../../assets/images/Home/FollowUs/image2.png";
import FUimg3 from "../../assets/images/Home/FollowUs/image3.png";
import FUimg4 from "../../assets/images/Home/FollowUs/image4.png";
import FUimg5 from "../../assets/images/Home/FollowUs/image5.png";
import FUimg6 from "../../assets/images/Home/FollowUs/image6.png";
import FUimg7 from "../../assets/images/Home/FollowUs/image7.png";

import { Link } from "react-router-dom";
import { fetchProducts, fetchcategory } from "../globalAPIs";
import Aos from "aos";
import { ProductCards } from "../ProductCards/ProductCards";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    const productsData = await fetchProducts();
    setAllProducts(productsData);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await fetchProducts();
        setAllProducts(productsData);

        // If a category is selected, filter products based on that category
        if (selectedCategory) {
          const filteredProductsVar = productsData.filter(
            (item) => item.category === selectedCategory
          );
          setProducts(filteredProductsVar);
        } else {
          // If no category is selected, set products to all products
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProductsData();
  }, [selectedCategory]);

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await fetchcategory();
      setCategories(categoriesData);
      localStorage.setItem("categories", JSON.stringify(categoriesData));
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    getProducts();
    const storedCategories = localStorage.getItem("categories");
    if (!storedCategories) {
      fetchCategoriesData();
    } else {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const filterProducts = () => {
    const filteredProductsVar = allProducts.filter(
      (item) => item.category === selectedCategory
    );
    setProducts(filteredProductsVar);
  };

  useEffect(() => {
    if (selectedCategory) {
      filterProducts();
    }
  }, [selectedCategory]);

  // Testimonial data
  const testimonialsData = [
    {
      name: "Sarah H.",
      text: "Absolutely love the quality and style of the products! My wardrobe has never looked better. Thank you for making fashion so accessible and fabulous!",
    },
    {
      name: "Michael R",
      text: "From impeccable customer service to trendy collections, this store has it all! I've become a loyal customer because of their consistent excellence.",
    },
    {
      name: "Emily L.",
      text: "I've never been disappointed with my purchases here. The clothes fit perfectly and the shipping is lightning-fast. Highly recommend!",
    },
    {
      name: "James S.",
      text: "As a fashion enthusiast, I'm always on the lookout for unique pieces. This store never fails to surprise me with its diverse selection and attention to detail.",
    },
    {
      name: "Jennifer K.",
      text: "The best part about shopping here is the confidence I feel when wearing their outfits. Each piece makes me feel empowered and stylish!",
    },
    {
      name: "David M.",
      text: "I'm impressed by how this store combines affordability with high-end fashion. Finally, a place where quality meets value!",
    },
    {
      name: "Samantha W.",
      text: "The clothes speak for themselves - they're chic, comfortable, and always on-trend. Plus, the online shopping experience is seamless!",
    },
    {
      name: "Alex B.",
      text: "I've received so many compliments on the outfits I've purchased here. It's clear that the designers have a keen eye for what's hot in fashion!",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonialsData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonialsData.length - 1 : prevSlide - 1
    );
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);
  return (
    <>
      <div className="main">
        <div className="header">
          <div className="img1">
            <img src={leftimage} alt="" />
          </div>

          <div className="img2">
            <img src={topimage} alt="" />
            <h2>Utimate</h2>
            <h1>SALE</h1>
            <p>New Collection</p>
            <Link className="shopnow" to={"/products"}>
              Shop Now
            </Link>
            <img src={bottomimage} alt="" />
          </div>

          <div className="img4">
            <img src={rightimage} alt="" />
          </div>

          {/* <div className="icon">
            <Link className="shopnow" to={"/cart"}>
              <img src={cart} alt="" />
            </Link>
          </div> */}
        </div>

        <div className="logos">
          <img src={ck} alt="" />
          <img src={ch} alt="" />
          <img src={denim} alt="" />
          <img src={lv} alt="" />
          <img src={prada} alt="" />
        </div>

        <div className="newArrivals">
          <h1 className="newHeader">New Arrivals</h1>
          <p>
            Discover the Latest Trends: Explore Our New Arrivals! Elevate Your
            Style with Fresh Fashion Picks. Stay Ahead of the Curve with Our
            Newest Collection!
          </p>

          <div className="sorting">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                  key={category}
                >
                  {category}
                </button>
              </li>
            ))}
          </div>

          <div className="fashion">
            {products.slice(0, 3).map((item, index) => {
              return <ProductCards props={item} key={index} />;
            })}
          </div>

          <div className="viewMore">
            <Link to="/products">View More</Link>
          </div>
        </div>

        <div className="features">
          <div className="highQuality">
            <img src={quality} alt="" />
            <div className="text">
              <h3 style={{ marginBottom: "5px" }}>High Quality</h3>
              <p style={{ marginTop: "10px" }}>crafted from top materials</p>
            </div>
          </div>
          <div className="warranyProtection">
            <img src={warrant} alt="" />
            <div className="text">
              <h3 style={{ marginBottom: "5px" }}>Warrany Protection</h3>
              <p style={{ marginTop: "10px" }}>Over 2 years</p>
            </div>
          </div>
          <div className="freeShipping">
            <img src={ship} alt="" />
            <div className="text">
              <h3 style={{ marginBottom: "5px" }}>Free Shipping</h3>
              <p style={{ marginTop: "10px" }}>Order over 150 $</p>
            </div>
          </div>
          <div className="support">
            <img src={support} alt="" />
            <div className="text">
              <h3 style={{ marginBottom: "5px" }}>24 / 7 Support</h3>
              <p style={{ marginTop: "10px" }}>Dedicated support</p>
            </div>
          </div>
        </div>

        <div className="followUs">
          <h1 style={{ marginTop: "50px" }}>Follow Us On Instagram</h1>
          <p style={{ textAlign: "center", width: "500px" }}>
            Stay ahead in style. Follow us on Instagram for daily fashion
            inspiration, exclusive sneak peeks, and behind-the-scenes glamour.
            Join our vibrant community of trendsetters and fashion enthusiasts.
            Let's ignite your passion for style together.
          </p>
          <div
            data-aos="flip-left"
            className="followUsPictures aos-init aos-animate"
          >
            <img src={FUimg1} alt="" />
            <img src={FUimg2} alt="" />
            <img src={FUimg3} alt="" />
            <img src={FUimg4} alt="" />
            <img src={FUimg5} alt="" />
            <img src={FUimg6} alt="" />
            <img src={FUimg7} alt="" />
          </div>
        </div>

        <div className="testimonials">
          <h1 style={{ marginTop: "50px" }}>This Is What Our Customers Say</h1>
          <div className="testinomialCard">
            <button className="testinomialPrev" onClick={prevSlide}>
              &#10094;
            </button>
            {/* Render up to three testimonials starting from the current slide */}
            {testimonialsData
              .slice(currentSlide, currentSlide + 3)
              .map((testimonial, index) => (
                <div
                  key={index + currentSlide}
                  className={
                    index === 0 ? "testimonialSlide active" : "testimonialSlide"
                  }
                >
                  <Card
                    style={{
                      margin: "0 10px 50px 10px",
                      padding: "10px",
                      maxWidth: 445,
                      maxHeight: 445,
                      backgroundColor: "#072a48",
                      color: "#7c878c",
                    }}
                  >
                    <Avatar
                      style={{ padding: "10px" }}
                      {...stringAvatar(testimonial.name)}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {testimonial.name}
                      </Typography>
                      <Typography
                        style={{ color: "#fff" }}
                        variant="body1"
                        color="text.secondary"
                      >
                        {testimonial.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            <button className="testinomialNext" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
