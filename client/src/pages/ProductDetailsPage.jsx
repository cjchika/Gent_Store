import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    setData(allProducts?.find((prod) => prod.name === productName));
  }, []);

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
