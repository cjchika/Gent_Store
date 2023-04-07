import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProductCard from "../components/subComponents/ProductCard/ProductCard";
import styles from "../styles/styles";
import { productData } from "../static/data";
import Footer from "../components/Layout/Footer";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const {allProducts,isLoading} = useSelector((state) => state.products);

  useEffect(() => {
    //    const prods = allProducts && allProducts.sort((a,b) => b.sold_out - a.sold_out); we will add it after complete order route
    //   const prods = allProducts;
    setData(
      productData && productData.sort((a, b) => a.total_sell - b.total_sell)
    );
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeader={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((item, index) => (
                  <ProductCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
