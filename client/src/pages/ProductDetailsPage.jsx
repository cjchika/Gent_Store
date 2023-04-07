import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams;
  const [data, setData] = useState();
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    //   const prod = productData && productData.find((prod) => prod.name === productName)
    setData(
      productData && productData.find((prod) => prod.name === productName)
    );
  }, []);

  return (
    <>
      <Header />
      <ProductDetails item={data} />
      {data && <SuggestedProducts />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
