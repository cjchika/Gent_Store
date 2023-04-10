import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const productName = name.replace(/-/g, " ");
  const [data, setData] = useState(null);

  console.log(name);

  useEffect(() => {
    const prod = productData.find((prod) => prod.name === productName);
    setData(prod);
  }, []);
  // console.log(productData);
  console.log(data);

  return (
    <>
      <Header />
      <ProductDetails item={data} />
      {data && <SuggestedProducts item={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
