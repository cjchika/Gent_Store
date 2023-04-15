import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/subComponents/ProductCard/ProductCard";
import styles from "../styles/styles";
import { productData } from "../static/data";
import Loader from "../components/Layout/Loader";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoadingProduct } = useSelector(
    (state) => state.products
  );
  // const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      setData(allProducts?.filter((i) => i.category === categoryData));
    }
    window.scrollTo(0, 0);
  }, [allProducts]);

  return (
    <>
      {isLoadingProduct ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeader={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((item, index) => (
                  <ProductCard item={item} key={index} />
                ))}
            </div>
            {data && data.length === 0 && (
              <h1 className="text-center text-secColor w-full pb-[100px] text-xl">
                No products Found!
              </h1>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
