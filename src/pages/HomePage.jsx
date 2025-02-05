import React from "react";
// import all components that are required in home page
import { Banner, CategoryList, TrendingProducts } from "../components/home";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <Banner />
      <CategoryList />
      <TrendingProducts />
    </div>
  );
};

export default HomePage;
