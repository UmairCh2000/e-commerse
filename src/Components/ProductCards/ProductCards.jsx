import React, { useEffect, useState } from "react";
import "./productCards.css";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ProductCards({ props }) {
  const navigate = useNavigate();
  const handleCardRedirect = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(props));
    navigate(`/product/${props.id}`);
  };
  return (
    <div className="cardMain" onClick={handleCardRedirect}>
      <div className="productImg">
        <img src={props.image} alt="" />
      </div>
      <div className="innerMain">
        <div className="cardTitle">
          <h2 style={{ color: "#072a48" }} className="productTitle">
            {props.title}
          </h2>
          <div className="cardRating">
            <Rating
              style={{ color: "#072a48", fontSize: "20px" }}
              name="read-only"
              value={props.rating?.rate}
              readOnly
            />{" "}
            <h4 style={{ color: "#072a48" }}>({props.rating?.rate})</h4>
          </div>
        </div>
        <div className="cardCat">
          <h4 style={{ color: "#072a48" }}>Category: {props.category}</h4>
        </div>
        <div className="cardPrice">
          <h3 style={{ marginRight: "5px", color: "#072a48" }}>
            ({props.rating?.count}) {"Customer Reviews"}
          </h3>{" "}
          <h2 style={{ color: "#ff4646 " }}>{props.price}$</h2>
        </div>

        <div className="product-price-btn">
          <button type="button" onClick={handleCardRedirect}>
            buy now
          </button>
        </div>
      </div>
    </div>
  );
}
