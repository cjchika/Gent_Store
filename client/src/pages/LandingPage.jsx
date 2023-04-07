import Header from "../components/Layout/Header";
import Hero from "../components/subComponents/Hero/Hero";
import Categories from "../components/subComponents/Categories/Categories";
import BestDeals from "../components/subComponents/BestDeals/BestDeals";
import FeaturedProduct from "../components/subComponents/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";

const LandingPage = () => {
  return (
    <>
      <Header activeHeader={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
    </>
  );
};

export default LandingPage;
