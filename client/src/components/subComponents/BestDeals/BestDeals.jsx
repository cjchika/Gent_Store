import { useState, useEffect } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const products =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(products.slice(0.1));
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="text-secColor">Best Deals</h1>
        </div>
        <div className="flex flex-wrap">
          {data &&
            data.map((item, index) => {
              <ProductCard item={item} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
