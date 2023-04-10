import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../subComponents/ProductCard/ProductCard";

const SuggestedProduct = ({ item }) => {
  // const {allProducts} = useSelector((state) => state.products);
  const [products, setProducts] = useState();

  useEffect(() => {
    // const prod =
    // allProducts && allProducts.filter((i) => i.category === data.category);
    setProducts(productData.filter((prod) => prod.category === item.category));
  }, []);

  return (
    <div>
      {item && (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-secColor text-2xl font-[500] border-b border-[#6b6b6d] border-opacity-20 mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products
                .slice(0, 5)
                .map((i, index) => <ProductCard item={i} key={index} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;
