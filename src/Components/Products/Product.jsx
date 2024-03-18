import React, { useEffect, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { ProductCards } from "../ProductCards/ProductCards";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("all");
  const [sortByCategory, setSortByCategory] = useState("all");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setAllProducts(productsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    let sorted = [...allProducts];

    if (sortByPrice === "lowToHigh") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "highToLow") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    }

    if (sortByCategory !== "all") {
      sorted = sorted.filter((product) => product.category === sortByCategory);
    }

    setSortedProducts(sorted);
  }, [allProducts, sortByPrice, sortByCategory]);

  return (
    <div className="mainProduct">
      <div className="headerMain">
        <h1>Fashion</h1>
      </div>
      <div className="subHeaderMain">
        <Link to="/home">Home</Link>
        <Link>/</Link>
        <Link to="/">Products</Link>
      </div>

      <div className="sortingDropdowns">
        <Select
          style={{ marginRight: "20px" }}
          value={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.value)}
          displayEmpty
        >
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="lowToHigh">Low to High</MenuItem>
          <MenuItem value="highToLow">High to Low</MenuItem>
        </Select>

        <Select
          style={{ marginRight: "20px" }}
          value={sortByCategory}
          onChange={(e) => setSortByCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="jewelery">Jewelery</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
        </Select>
      </div>

      {loading ? (
        <CircularProgress variant="determinate" />
      ) : (
        <div className="productsFashion">
          {sortedProducts.map((item, index) => {
            return <ProductCards props={item} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Product;
