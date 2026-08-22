import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import PageLayout from "./PageLayout";
import { fetchProducts } from "./state-store/state-store.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const MyCard = lazy(() => import("./pages/MyCard.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const FormPage = lazy(() => import("./pages/FormPage.jsx"));

export default function Market() {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<div className="loading"></div>}>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path="aboutUs" element={<About />} />
              <Route path="myCard" element={<MyCard />} />
              <Route path="myCard/form" element={<FormPage />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}
