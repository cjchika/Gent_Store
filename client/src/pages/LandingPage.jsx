import Header from "../components/Layout/Header";
import Hero from "../components/subComponents/Hero/Hero";
import Categories from "../components/subComponents/Categories/Categories";
import BestDeals from "../components/subComponents/BestDeals/BestDeals";

const LandingPage = () => {
  return (
    <>
      <Header activeHeader={1} />
      <Hero />
      <Categories />
      <BestDeals />
    </>
  );
};

export default LandingPage;
