import Header from "../components/Layout/Header";
import Hero from "../components/subComponents/Hero/Hero";
import Categories from "../components/subComponents/Categories/Categories";
import BestDeals from "../components/subComponents/BestDeals/BestDeals";
import FeaturedProduct from "../components/subComponents/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Brands from "../components/subComponents/Brands/Brands";
import Footer from "../components/Layout/Footer";

const LandingPage = () => {
  return (
    <>
      <Header activeHeader={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Brands />
      <Footer />
    </>
  );
};

export default LandingPage;
