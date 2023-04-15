import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import productApi from "../config/services/product.api";
import Loader from "../components/Layout/Loader";

const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function findProd() {
      setIsLoading(true);
      try {
        const { response, error } = await productApi.getProduct(id);
        if (response) setData(response.product);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    findProd();
  }, [id]);

  return (
    <>
      <Header />
      {isLoading ? <Loader /> : <ProductDetails item={data} />}
      {data && <SuggestedProducts item={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
