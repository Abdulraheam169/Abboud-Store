import React from "react";
import { Link } from "react-router";
import storeImg from "/store.png";

export default function Home() {
  return (
    <>
      <h1>Hi There, This is Abdulraheam's Fake Store!</h1>
      <p>
        We don't actually sell anything, but feel free to browse our selection.
      </p>
      <div className="home-container">
        <img src={storeImg} alt="Store" />
        <div>
          <h3>Made By Abd Al-Raheam Al-Roqaya</h3>
          <h4>With Love :)</h4>
        </div>
        <h2>Your Comfort Is Matter</h2>
      </div>
      <div style={{ margin: "20px" }}>
        {"Do You Want To Take A look ? Go To The "}
        <Link to="products">Products Page</Link>
      </div>
    </>
  );
}
