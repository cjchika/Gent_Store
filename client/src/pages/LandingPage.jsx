import Header from "../components/Layout/Header";
import Hero from "../components/subComponents/Hero/Hero";
import Categories from "../components/subComponents/Categories/Categories";

const LandingPage = () => {
  return (
    <>
      <Header activeHeader={1} />
      <Hero />
      <Categories />
    </>
  );
};

export default LandingPage;
